import jwt from 'jsonwebtoken';
import configs from '../../configs';
import { Types } from 'mongoose';
import { Request } from 'express';
import userSessionService from '../../services/session';
import { NextRequest } from 'next/server.js';

interface User {
    regNo: string,
    _id: Types.ObjectId | string
}

interface Admin {
    userName: string,
    _id: Types.ObjectId | string
}

interface JwtRequest extends Request {
    decoded: any,
}

const secret = configs.secret.jwtSecret || '';

function signJsonWebToken({ regNo, _id }: User, req: NextRequest) {
    const token_payload = { regNo, id: _id };

    const token = jwt.sign(token_payload, secret, { expiresIn: '1h' });
    return token;
}

function signAdminJsonWebToken({ userName, _id }: Admin, req: NextRequest) {
    const token_payload = { userName, id: _id };
    const token = jwt.sign(token_payload, secret, { expiresIn: '1h' });
    return token;
}

async function authenticateToken(req: any, res: Response, next: () => void) {
    const clientToken = req.body['x-access-token'] || req.query['x-access-token'] || req.headers['x-access-token'];
    if (!clientToken) {
        return Response.json({status: 401, success: false, message: 'Un authorized'});
    }

    try {
        const decodedToken = await verifyJwt(clientToken, secret);
        req.decoded = decodedToken;
        next()
    } catch (err) {
        return Response.json({status: 403, success: false,  message: 'Failed to authenticate token.'});
    }
}

function signAndSaveJwtToSession({ regNo, _id }: User, req: Request) {
    const token_payload = { regNo, id: _id };
    const token = jwt.sign(token_payload, secret, { expiresIn: '1h' });
    userSessionService.set(req).save('jwt', token);
    return token;
}

async function authenticateTokenWithSession(req: any, res: Response, next: () => void) {
    const clientToken = req.body['x-access-token'] || req.query['x-access-token'] || req.headers['x-access-token'];
    let serverToken;
    try {
        serverToken = await userSessionService.set(req).get();
    } catch (err) {
        // TODO... hanlde error
        // return res.status(403).send({status: 403, success: false,  message: 'Failed to authenticate token.'});
    }
    if (!clientToken || !serverToken) {
        return Response.json({status: 401, success: false, message: 'Un authorized'});
    }

    if (clientToken !== serverToken) {
        return Response.json({status: 401, success: false, message: 'Un authorized'});
    }

    try {
        const decodedToken = await verifyJwt(clientToken, secret);
        req.decoded = decodedToken;
        next()
    } catch (err) {
        return Response.json({status: 403, success: false,  message: 'Failed to authenticate token.'});
    }
}

function verifyJwt(token: string, secret: string): Promise<{expired: boolean, data: any}> {
    return new Promise((res, rej) => {
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {

                if (err.name === "TokenExpiredError") {
                    res({
                        expired: true,
                        data: err
                    });
                }
               rej(err);
            }
            res({
                expired: false,
                data: decoded
            });
        });
    })
}

class JwtService {
    verify(token: string) {
       return verifyJwt(token, secret); 
    }
}

const jwtService = new JwtService();

export default authenticateToken;
export {
    secret,
    signJsonWebToken,
    signAdminJsonWebToken,
    signAndSaveJwtToSession,
    authenticateTokenWithSession,
    jwtService
}
