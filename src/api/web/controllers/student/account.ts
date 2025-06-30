import { NextFunction, Request } from 'express';
import { uploadimageToCDN } from '../../lib/cdn';
import { ResponseJSON } from '../../lib/responses/index.js';
import { imageDataUri, profileImagePath } from '../../lib/multer';
import path from 'node:path';
import { 
    // authenticateTokenWithSession, 
    jwtService, 
    signJsonWebToken 
} from '../../lib/jwt';
import userSessionService from '../../services/session';
import validateForm from '../../lib/formValidation';
import { filterUser } from '../../lib/shared';
import logs from '../../lib/exceptions';
import { studentAccountService, studentService } from '../../services/student';
import { NextRequest, NextResponse } from 'next/server.js';
// import { cookieKey } from '@/middleware.js';
import { cookies } from 'next/headers.js';
// import { studentService } from '../../services/student/index.js';
const { handleUserException } = logs;


class Controller {
    async signUp(req: NextRequest) {
        // Parse the request body
        const body = await req.json();
        const { regNo } = body;
        
        // return new Response(JSON.stringify(newUser), {
        //     status: 201,
        //     headers: { 'Content-Type': 'application/json' }
        // });

        console.log("signup details", JSON.stringify(body, null, 2));
        const { error, status, valErrors } = validateForm(req);
        if (error) {

            const response = {
                status: status || 401,
                error: true,
                valErrors: valErrors,
                data: null,
                message:"Form validation failed",
            }
            console.error('form validation failed', valErrors);
            return NextResponse.json(response, {status: 401});
        }

        try {
            const userExist = await studentAccountService.accountExist(regNo, 'regNo');

            console.log("user exist", userExist);

            if (userExist) {
                const response: ResponseJSON = {
                    status: 400,
                    error: true,
                    userExist: true,
                    message: "User account already exist",
                    // token: '',
                    data: null
                }
                return NextResponse.json(response, {status: 400});
            }
    
            const user = await studentAccountService.createAccount(body);

            if (user) {
                const student = await studentService.getStudentById(user.studentId);
                const signTokenData = {regNo: user.regNo, _id: user._id};
                const token = signJsonWebToken(signTokenData, req);
                const tokenExpiration = (await jwtService.verify(token)).data.exp;
                const sessionUser = {
                    id: user._id,
                    jwtToken: token,
                    jwtTokenExp: tokenExpiration
                }
                // userSessionService.set(req).save("user", sessionUser);
                return filterUser(user).then(user => {
                    console.log("filtered user is" , user);
                    const response = {
                        status: 200,
                        userExist: false,
                        data: user,
                        student,
                        token: token,
                        tokenExpiration: tokenExpiration,
                        error: false,
                        message: 'user signed up',
                    }
                    return NextResponse.json(response, {status: 200});
                }).catch(err => { throw err });
            }
        } catch (err) {
            console.error(err);
            return NextResponse.json({message: 'internal server error'}, {status: 500});
            // handleUserException(res, 500, true, "Error occured while creating account", err);
        }
    }

    async signIn(req: NextRequest, res: NextResponse) {
        const body = await req.json();
        const { regNo, password } = body;
    
        try {
            const user = await studentAccountService.getAccountByRegNo(regNo);
    
            if (!user) {
                console.error('no user found');
                const response: ResponseJSON = {
                    status: 400,
                    error: true,
                    message: 'Incorrect Reg Number',
                    token: '',
                    data: null
                };
    
                return NextResponse.json(response, {status: 200});
            }
            const student = await studentService.getStudentById(user.studentId);
            const signTokenData = {regNo: user.regNo, _id: user._id};
            const checkPassword = await studentAccountService.checkAccountPassword(password, user);
    
            if (!checkPassword.match) {
                const response: ResponseJSON  = {
                    status: 400,
                    error: true,
                    message: 'Incorrect password.',
                    data: null
                }
                return NextResponse.json(response, {status: 200});
            }

            // const tokenExpiration = Date.now() + 2 * 60 * 60 * 1000;
            const token = signJsonWebToken(signTokenData, req);
            const tokenExpiration = (await jwtService.verify(token)).data.exp;
            const sessionUser = {
                id: user._id,
                jwtToken: token,
                jwtTokenExp: tokenExpiration
            }

            const filteredUser = await filterUser(user);
            const response = {
                status: 200,
                error: false,
                data: filteredUser,
                student: student,
                token: token,
                tokenExpiration: tokenExpiration,
                message: 'Login Successful'
            }
            // const nextResponse = NextResponse.next();
            const userCookie = {
                ...filteredUser,
                ['x-access-token']: token,
                jwtExpireAt: tokenExpiration
            }
            const cookieStore = await cookies();

            cookieStore.set({
                name: "loginCookie",
                value: userCookie,
                httpOnly: true,
                path: '/'
            })

            // nextResponse.cookies.set({
            //     name: cookieKey,
            //     value: userCookie,
            //     // path: '/',
            // })
           
            return NextResponse.json(response, {status: 200});

            // userSessionService.set(req).save("user", sessionUser);
        } catch(err) {
            console.error(err);
            handleUserException(res, 500, true, "Error occured while login in", err);
        }
    }

    async logOut(
        req: NextRequest,
        { params }: { params: Promise<{ id: string }> },
    ) {
        try {
            const studentId = (await params).id;

            if (!studentId) {
                const response = {
                    status: 403,
                    authenticated: true,
                    message: 'Un authrized'
                }
                return NextResponse.json(response, {status: response.status});
            }
            const student = await studentService.getStudentById(studentId);

            if (!student) {
                const response = {
                    status: 403,
                    authenticated: true,
                    message: 'Student not found'
                }
                return NextResponse.json(response, {status: response.status});
            }

            const cookieStore = await cookies();
            const cookie = cookieStore.get("loginCokie")?.value;

            if (!cookie) {
                const response = {
                    status: 403,
                    authenticated: true,
                    message: 'User not logged in'
                }
                return NextResponse.json(response, {status: response.status});
            }

            cookieStore.delete("loginCookie");

            const response = {
                status: 200,
                authenticated: true,
                message: 'Log out successful'
            }
            return NextResponse.json(response, {status: 200});
        } catch (err) {
            console.error(err);
            handleUserException(new NextResponse(), 200, true, "Error occured while authenticating user token", err);
        }
    }

    async authenticateToken(req: NextRequest, res: NextResponse) {
        try {
            // const clientToken = req.headers.get('x-access-token');
            const body = await req.json();
            const clientToken = body['x-access-token'];

            console.log(clientToken);
            if (!clientToken) {
                return NextResponse.json({
                    status: 401, 
                    authenticated: false, 
                    message: 'Un authorized'
                }, {status: 200});
            }

            const decodedToken = await jwtService.verify(clientToken);
            if (!decodedToken ||  decodedToken.expired) {
                const response = {
                    status: 403,
                    authenticated: false,
                    message: 'Un authorized'
                }
                return NextResponse.json(response, {status: 200});
            }

            const response = {
                status: 200,
                authenticated: true,
                message: 'Authorized'
            }
            return NextResponse.json(response, {status: 200});
        } catch (err) {
            console.error(err);
            handleUserException(res, 200, true, "Error occured while authenticating user token", err);
        }
    }

    
    async get(
        req: NextRequest, 
        { params }: { params: Promise<{ id: string }> },
    ) {
        const userId = (await params).id;
        let response: ResponseJSON;

        try {
            const user = await studentAccountService.getAccountById(userId);

            if (!user) {
                response = {
                    status: 200,
                    data: user,
                    error: false,
                    message: 'no user found',
                }
                return NextResponse.json(response, {status: 200});
            }
            
            response = {
                status: 200,
                data: user,
                error: false,
                message: 'user gotten successfully',
            }
            return NextResponse.json(response, {status: 200});
        } catch (err) {
            console.error(err);
            handleUserException(new NextResponse(), 500, true, "Error occured while getting user", err);
        } 
    }

    async updateAccountPass(
        req: NextRequest, 
        { params }: { params: Promise<{ studentId: string, accountId: string }> },
    ) {
        try {

            const studentId = (await params).studentId;
            // const accountId = (await params).accountId;
            const body = await req.json();
            let response: ResponseJSON;
            const account = await studentAccountService.getAccountByStudentId(studentId);

            if (!account) {
                response = {
                    status: 200,
                    data: null,
                    error: false,
                    message: 'no user found',
                }
                return NextResponse.json(response, {status: 200});
            }
            const { error, match:isValidPassword } = await studentAccountService.checkAccountPassword(body.oldPassword, account);

            if (!isValidPassword) {
                response = {
                    status: 200,
                    // data: user,
                    error: false,
                    message: 'Old password does not match',
                }
                return NextResponse.json(response, {status: 200});
            }
            await studentAccountService.updatePassword(account._id, body.newPassword)
            
            response = {
                status: 200,
                // data: user,
                error: false,
                message: 'user gotten successfully',
            }
            return NextResponse.json(response, {status: 200});
        } catch (err) {
            console.error(err);
            handleUserException(new NextResponse(), 500, true, "Error occured while getting user", err);
        } 
    }
}

const studentAccountController = new Controller();
export default studentAccountController;