// import { Request, Response } from 'express';
import { uploadimageToCDN } from '../../lib/cdn';
import { ResponseJSON } from '../../lib/responses';
import logs from '../../lib/exceptions/';
import { studentService, studentTokenService } from '../../services/student';
import { PurchasedToken } from '../../../database/models/student';
import schoolService from '../../services/school';
import { CreateStudentToken } from '../../../database/models/studentToken';
import { NextRequest, NextResponse } from 'next/server.js';
const { handleUserException } = logs;



class Controller {
    async generateToken(
        req: NextRequest, 
        { params }: { params: Promise<{id: string }> },
    ) {
        // const { studentId } = req.params;
        const studentId = (await params).id;

        try {
            const school = await schoolService.getSchool();
            const student = await studentService.getStudentById(studentId);
            const studentToken = await studentTokenService.getActiveToken(studentId);

            if (studentToken) {
                const response = {
                    error: false,
                    status: 200,
                    message: 'Token for semester already generated',
                    // data: token
                }
                return NextResponse.json(response, {status: 200});
            }

            if (student) {
                const tokenData: CreateStudentToken = {
                    studentId: studentId,
                    value: "",
                    level: student.level,
                    session: school.currentSession,
                    semester: school.currentSemester,
                }
    
                const token = await studentTokenService.createToken(tokenData); 
                await studentService.addPurchaseToken(studentId, tokenData);
    
                const response = {
                    error: false,
                    status: 200,
                    message: 'Token generated successfully',
                    data: token
                }
                console.log('generate token', response)
                return NextResponse.json(response, {status: 200});
            }
        } catch(err) {
            console.error(err);
            handleUserException(new NextResponse(), 500, true, "Error occured while creating profile", err);
        }
    }

    // async activateToken(req: Request, res: Response) {
    //     const { studentId } = req.body;

    //     try {

    //         const token = await studentTokenService.activateToken(studentId);
    //         await studentService.addPurchaseToken(studentId, req.body);

    //         const response = {
    //             error: false,
    //             status: 200,
    //             message: 'Token generated successfully',
    //             data: token.data
    //         }
    //         res.status(200).json(response);
    //         return;

    //     } catch (err) {
    //         console.error(err);
    //         handleUserException(res, 500, true, "Error occured while regenerating token", err);
    //     } 
    // }

    async deActivateToken(req: NextRequest, res: NextResponse) {
        // const { studentId } = req.body;
        const body = await req.json();
        const { studentId } = body;

        try {

            const token = await studentTokenService.deActivateToken(studentId);
            // await studentService.addPurchaseToken(studentId, req.body);

            const response = {
                error: false,
                status: 200,
                message: 'Token generated successfully',
                data: token.data
            }
            return NextResponse.json(response, {status: 200});
        } catch (err) {
            console.error(err);
            handleUserException(res, 500, true, "Error occured while regenerating token", err);
        } 
    }

    async authenticateToken(
        req: NextRequest,
        { params }: { params: Promise<{id: string }> }    
    ) {
        try {
            // const body = await req.json();
            const studentId = (await params).id;
            const studentToken = await studentTokenService.getActiveToken(studentId);

            console.log("student token", studentToken);
            if (!studentToken) {
                const response = {
                    error: true,
                    status: 400,
                    authenticated: false,
                    message: 'Token authentication failed',
                    data: null
                }
                return NextResponse.json(response, {status: 200});
            }

            const response = {
                error: false,
                status: 200,
                data: studentToken,
                authenticated: true,
                message: 'Token authenticated successfully',

            }
            return NextResponse.json(response, {status: 200});
        } catch (err) {
            console.error(err);
            handleUserException(new NextResponse(), 500, true, "Error occured while autehnticating token", err);
        } 
    }
}

const studentTokenController = new Controller();
export default studentTokenController;
