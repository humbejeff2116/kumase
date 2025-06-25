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
    async updateProfileImage (
        req: any, 
        { params }: { params: Promise<{ accountId: string, studentId: string }> },
    ) {
        const userId = (await params).accountId;
        const studentId = (await params).studentId;
        const profileImage = req.file;

        console.log('profile image', profileImage)

        if (!profileImage) {
            const response: ResponseJSON = {
                status: 400,
                error: true,
                message: "Please provide a profile image",
                data: null
            }
            return NextResponse.json(response, {status: 400});
        }
    
        try {

            // move functionality to authenticate middleWare
            if (!await studentAccountService.accountExist(userId, 'id')) {
                const response: ResponseJSON = {
                    status: 400,
                    error: true,
                    message: "No user found",
                    data: null
                }
                return NextResponse.json(response, {status: 400});
            }

            const user = await studentService.updateProfileImage(
                studentId, 
                path.join(profileImagePath, profileImage.filename)
            );

            const { status, error, data } = user;
            
            if (!error && status === 201) {
                const response: ResponseJSON = {
                    status: 200,
                    data: data,
                    error: false,
                    message: 'Profile image updated successfully',
                }
                return NextResponse.json(response, {status: 200});
            }
        } catch(err) {
            console.error(err);
            handleUserException(new NextResponse(), 500, true, "Error occured while creating profile", err);
        }
    }

    async getProfileImage(
        req: NextRequest, 
        { params }: { params: Promise<{ accountId: string, studentId: string }> },
    ) {
        const  studentAccountId = (await params).accountId;
        const studentId = (await params).accountId;
        try {

            // TODO... move this functionality to middleware run on all routes called by students
            if (!await studentAccountService.accountExist(studentAccountId, 'id')) {
                const response: ResponseJSON = {
                    status: 400,
                    error: true,
                    message: "No user found",
                    data: null
                }
                return NextResponse.json(response, {status: 400});
            }
            studentService.getProfileImage(studentId, new NextResponse())
            return;
        } catch (err) {
            console.error(err);
            handleUserException(new NextResponse(), 500, true, "Error occured while getting users", err);
        } 
    }

    async getAll(req: NextRequest, res: NextResponse) {
        try {
            const users = await studentService.getAll();
            const response: ResponseJSON = {
                status: 200,
                data: users,
                error: false,
                message: 'users gotten successfully',
            }
            return NextResponse.json(response, {status: 200});
        } catch (err) {
            console.error(err);
            return NextResponse.json({message: 'internal server err'}, {status: 500});
            // handleUserException(res, 500, true, "Error occured while getting users", err);
        } 
    }

    async getStudent(req: NextRequest, res: NextResponse) {
        // const { id:studentId, queryType } = req.query;
        const searchParams = req.nextUrl.searchParams;
        const studentId = searchParams.get('id');
        const queryType = searchParams.get('queryType'); // e.g. `/api/search?query=hello`
        let response = {};

        try {
            const student = (
                queryType === 'id' ?
                await studentService.getStudentById(String(studentId)) : 
                await studentService.getStudentByRegNo(String(studentId))
            );
           
            if (!student) {
                response = {
                    status: 200,
                    data: student,
                    studentToken: null,
                    error: false,
                    message: 'no student found',
                }
                return NextResponse.json(response, {status: 200});
            }

            const studentToken = await studentTokenService.getActiveToken(student._id);
            
            response = {
                status: 200,
                error: false,
                studentToken: studentToken, 
                data: student,
                message: 'student gotten successfully',
            }
            return NextResponse.json(response, {status: 200});
        } catch (err) {
            console.error(err);
            handleUserException(res, 500, true, "Error occured while getting student", err);
        } 
    }

    async onboard(req: NextRequest) {
        try {
            const body = await req.json();
            const { regNo } = body;

            console.log('body is', body)
            const student = await studentService.getStudentByRegNo(regNo);

            if (student) {
                const response: ResponseJSON = {
                    status: 200,
                    error: false,
                    message: "Student already onboarded",
                    data: student
                }
                return NextResponse.json(response, {status: 200});
            }

            const studentRecord = await studentService.createStudentRecord(body);
            const accountExist = await studentAccountService.accountExist(regNo, 'regNo');

            if (accountExist) {
                const response: ResponseJSON = {
                    status: 400,
                    error: true,
                    userExist: true,
                    message: "student account already exist",
                    // token: '',
                    data: null
                }
                return NextResponse.json(response, {status: 400});
            }

            const studentAccountDetails = {
                regNo: regNo,
                studentId: studentRecord._id,
                password: studentTokenHandler.generateToken(8)
            }

            await studentAccountService.createAccount(studentAccountDetails);
            const response = {
                status: 200,
                error: false,
                data: studentRecord,
                account: studentAccountDetails, 
                message: 'Student onboarded succesfully',
            }
            return NextResponse.json(response, {status: 200});
        } catch(err) {
            console.error("error occured while onboarding students",err);
            return NextResponse.json({message: 'internal server err'}, {status: 500});
            // handleUserException(res, 500, true, "Error occured while onboarding student", err);
        }
    }

    async registerCourse(
        req: NextRequest,
        { params }: { params: Promise<{ id: string }> },
    ) {
        const studentId = (await params).id;
        const body = await req.json();
        let response: ResponseJSON;
        try {

            const school = await schoolService.getSchool();
            const [student, studentToken] = await Promise.all([
                studentService.getStudentById(studentId),
                studentTokenService.getActiveToken(studentId)
            ]);

            if (!student) {
                const response = {
                    error: true,
                    status: 400,
                    authenticated: false,
                    message: 'Student not found',
                    // data: token.data
                }
                return NextResponse.json(response, {status: 400});
            }

            if (!studentToken) {
                const response = {
                    error: true,
                    status: 400,
                    authenticated: false,
                    message: 'Token authentication failed',
                    // data: token.data
                }
                return NextResponse.json(response, {status: 400});
            }

            if (student && student.registeredCourse(school)) {
                const response = {
                    status: 200,
                    // data: regCourse.data,
                    error: false,
                    message: 'Student already registered course',
                }
                return NextResponse.json(response, {status: 200});
            }

            const courseReg: CourseReg = {
                level: student.level,
                session: school.currentSession,
                semester: school.currentSemester,
                time: Date.now()
            } 

            const regCourse = await studentService.registerCourse(studentId, courseReg);
            
            response = {
                status: 200,
                data: regCourse.data,
                error: false,
                message: 'Course Registration Successful',
            }
            return NextResponse.json(response, {status: 200});
        } catch (err) {
            console.error(err);
            handleUserException(new NextResponse(), 500, true, "Error occured while registering course", err);
        } 
    }

    async getStudentsIds(
        req: NextRequest, 
        { params }: { params: Promise<{id: string }> },
    ) {
        // const { studentId } = req.params;
        const studentId = (await params).id;
        let response: ResponseJSON;

        try {
            const studentsIds = await studentService.getStudentsIds();

            response = {
                status: 200,
                data: studentsIds,
                error: false,
                message: 'students ids gotten succesfully',
            }
            return NextResponse.json(response, {status: 200});
        } catch (err) {
            console.error(err);
            handleUserException(new NextResponse(), 500, true, "Error occured while getting students ids", err);
        } 
    }

    async authCourseReg(
        req: NextRequest, 
        { params }: { params: Promise<{id: string }> },
    ) {
        const studentId = (await params).id;
        let response: ResponseJSON;

        try {
            const school = await schoolService.getSchool();
            const student = await studentService.getStudentById(studentId);

            if (!student) {
                const response = {
                    status: 403,
                    isRegistered: null,
                    error: false,
                    message: 'Student does not exist',
                }
                return NextResponse.json(response, {status: 403});
            }

            const response = {
                status: 200,
                isRegistered: student?.registeredCourse(school),
                error: false,
                message: 'Auth student reg course gotten successfully',
            }
            return NextResponse.json(response, {status: 200});
        } catch (err) {
            console.error(err);
            handleUserException(new NextResponse(), 500, true, "Error occured while authenticating reg course", err);
        } 
    }
}

const studentController = new Controller();
export default studentController;