// import { NextFunction, Request, Response } from "express";
import { studentAccountService, studentService } from "../../services/student";
import { ResponseJSON } from "../../lib/responses";
import logs from "../../lib/exceptions";
import { NextRequest, NextResponse } from "next/server";
const { handleUserException } = logs;

class StudentMiddleWares {
    async studentExists(
        req: NextRequest, 
        { params }: { params: Promise<{id: string }> },
    ) {
        try {
            // const { studentId } = req.body;
            const studentId = (await params).id;

            if (!studentId) {
                return Response.json({
                    status: 401, 
                    success: false, 
                    message: 'Un authorized'
                });
            }

            if (!await studentService.studentExist(studentId, 'id')) {
                const response: ResponseJSON = {
                    status: 400,
                    error: true,
                    message: "No student found",
                    data: null
                }
                return Response.json(response);
                // return;
            }
            // next();
        } catch (err) {
            console.error(err);
            handleUserException(new NextResponse(), 200, true, "Error occured while authenticating user", err);
        }
    }

    async studentAccountExists(
        req: Request, 
        { params }: { params: Promise<{id: string }> },
    ) {
        try {
            const accountId = (await params).id;

            if (!accountId) {
                return Response.json({
                    status: 401, 
                    success: false, 
                    message: 'Un authorized'
                });
            }

            if (!await studentAccountService.accountExist(accountId, 'id')) {
                const response: ResponseJSON = {
                    status: 400,
                    error: true,
                    message: "Student Account does not exist",
                    data: null
                }
                return Response.json(response);
            }
            // next();
        } catch (err) {
            console.error(err);
            handleUserException(new NextResponse(), 200, true, "Error occured while authenticating user", err);
        }
    }
}

const studentMiddleWares = new StudentMiddleWares();
export default studentMiddleWares;