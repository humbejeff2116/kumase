import { NextFunction, Request, Response } from "express";
import userSessionService from "../services/session";
import { jwtService } from "../lib/jwt";
import logs from '../lib/exceptions';
import { NextResponse } from "next/server";
const { handleUserException } = logs;


class AuthMiddleWare {
    async ensureUserIsAuthenticated(
        req: Request, 
        res: Response, 
        next: NextFunction
    ) {
        try {
            const userSession = await userSessionService.set(req).get();
            const loginCookie = JSON.parse(req.cookies.loginCookie);
            const clientJwt = loginCookie["x-access-token"];
    
    
            if (!loginCookie) {
                res.status(401).send({status: 401, success: false, message: 'Un authorized'});
                return;
            }
    
            if (loginCookie["x-access-token"] !== userSession?.user.jwtToken) {
                console.log("tokens doesnt match");
                const response = {
                    status: 403,
                    authenticated: false
                }
                res.status(200).json(response);
                return;
            }
    
            const decodedToken = await jwtService.verify(clientJwt);
            console.log("decoded token is",decodedToken)
    
            if (!decodedToken ||  decodedToken.expired) {
                const response = {
                    status: 403,
                    authenticated: false
                }
                res.status(200).json(response);
                return
            }
    
            next();
        } catch (err) {
            console.error(err);
            handleUserException(new NextResponse, 200, true, "Error occured while authenticating user", err);
        }
    }
}

const authMiddleWare = new AuthMiddleWare();
export default authMiddleWare;