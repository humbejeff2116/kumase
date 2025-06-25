import { jwtService, signAdminJsonWebToken } from '../../lib/jwt';
import validateForm from '../../lib/formValidation';
import { filterUser } from '../../lib/shared';
import logs from '../../lib/exceptions';
import adminAccountService from '../../services/admin';
import { NextRequest, NextResponse } from 'next/server.js';
import { ResponseJSON } from '../../lib/responses';
const { handleUserException } = logs;


class Controller {
    async signUp(req: NextRequest, res: NextResponse) {
        // const regNo = req.body.regNo;
        // const refLink = req.body.referrerLink ? String(req.body.referrerLink) : '';
    

        const body = await req.json();
        const { regNo } = body;

        console.log("signup details", req.body);
        const { error, status, valErrors } = validateForm(req);
        if (error) {

            const response = {
                status: status,
                error: true,
                valErrors: valErrors,
                data: null,
                message:"Form validation failed",
            }
            console.error('form validation failed', valErrors);
            return Response.json(response);
        }

        try {
            const userExist = await adminAccountService.accountExist();

            console.log("user exist", userExist);

            if (userExist) {
                const response: ResponseJSON = {
                    status: 400,
                    error: true,
                    userExist: true,
                    message: "Admin account already exist",
                    // token: '',
                    data: null
                }
                return Response.json(response);
            }
    
            const user = await adminAccountService.createAccount(body);

            const signTokenData = {userName: "admin", _id: user._id};
            const token = signAdminJsonWebToken(signTokenData, req);
            const tokenExpiration = (await jwtService.verify(token)).data.exp;
            const sessionUser = {
                id: user._id,
                jwtToken: token,
                jwtTokenExp: tokenExpiration
            }
            // userSessionService.set(req).save("user", sessionUser);
            filterUser(user).then(user => {
                console.log("filtered user is" , user);
                const response = {
                    status: 200,
                    userExist: false,
                    data: user,
                    token: token,
                    tokenExpiration: tokenExpiration,
                    error: false,
                    message: 'user signed up',
                }
                return Response.json(response);
            }).catch(err => { throw err });

        } catch (err) {
            console.error(err);
            // handleUserException(res, 500, true, "Error occured while creating account", err);
        }
    }

    async signIn(req: NextRequest, res: Response) {
        // const regNo = req.body.regNo;
        // const password = req.body.password;
        const body = await req.json();
        const { password  } = body;

        
    
        try {
            const user = await adminAccountService.getAccount();
            console.log("logged in user is --usercontroller", user);
    
            if (!user) {
                console.error('no user found');
                const response: ResponseJSON = {
                    status: 400,
                    error: true,
                    message: 'Account not found',
                    token: '',
                    data: null
                };
    
                return Response.json(response);
            }
            const signTokenData = {userName: 'admin', _id: user._id};
            const checkPassword = await adminAccountService.checkAccountPassword(password, user);
    
            if (!checkPassword.match) {
                const response: ResponseJSON  = {
                    status: 400,
                    error: true,
                    message: 'Incorrect password.',
                    data: null
                }
                return Response.json(response);
            }

            // const tokenExpiration = Date.now() + 2 * 60 * 60 * 1000;
            // TODO... modify function for admin usage
            const token = signAdminJsonWebToken(signTokenData, req);
            const tokenExpiration = (await jwtService.verify(token)).data.exp;
            const sessionUser = {
                id: user._id,
                jwtToken: token,
                jwtTokenExp: tokenExpiration
            }

            filterUser(user).then(user => {
                console.log("filtered user is" , user);
                const response = {
                    status: 200,
                    error: false,
                    data: user,
                    token: token,
                    tokenExpiration: tokenExpiration,
                    message: 'Login Successful'
                }
                return Response.json(response);
            }).catch(err => { throw err });

            // userSessionService.set(req).save("user", sessionUser);
        } catch(err) {
            console.error(err);
            handleUserException(res, 500, true, "Error occured while login in", err);
        }
    }
}

const adminController = new Controller();
export default adminController;