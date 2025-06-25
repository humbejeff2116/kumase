// import { Request, Response } from 'express';
import { uploadimageToCDN } from '../../lib/cdn';
import { ResponseJSON } from '../../lib/responses';
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
import { studentAccountService, studentService, studentTokenService } from '../../services/student';
import schoolService from '../../services/school';
import { CourseReg } from '../../../database/models/student';
import { NextRequest, NextResponse } from 'next/server.js';
import studentTokenHandler from '../../lib/studentToken';
const { handleUserException } = logs;


class Controller {
    async get(req: NextRequest, res: NextResponse) {
        try {
            const school = await schoolService.getSchool();
            const response: ResponseJSON = {
                status: 200,
                data: school,
                error: false,
                message: 'school gotten successfully',
            }
            return NextResponse.json(response, {status: 200});
        } catch (err) {
            console.error(err);
            return NextResponse.json({message: 'internal server err'}, {status: 500});
            // handleUserException(res, 500, true, "Error occured while getting users", err);
        } 
    }
}

const schoolController = new Controller();
export default schoolController;