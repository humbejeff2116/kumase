import { Schema, model, Types, Model, HydratedDocument, } from 'mongoose';
import { School } from '../school/index.js';


// export interface PaidFor {
//     session: string
//     level: string
//     semester: string
// }

export const tokenStatus = {
    active: 'active',
    expired: 'expired'
}

export interface StudentToken {
    _id?: Types.ObjectId
    studentId: string
    value: string
    level: string
    session: string
    semester: string
    createdAt?: Date
}

export interface CreateStudentToken {
    studentId: string
    value: string
    level: string
    session: string
    semester: string
}

interface Response {
    status: number,
    error: boolean, 
    data: any
}

interface StudentTokenMethods {
    isActive(school: School): boolean; 
}

interface StudentTokenModelStatics extends Model<StudentToken, object, StudentTokenMethods> {
    createToken(token: CreateStudentToken): Promise<HydratedDocument<StudentToken, StudentTokenMethods> | null>;
    getAll(): Promise<Array<HydratedDocument<StudentToken, StudentTokenMethods>>>;
    activateToken(studentId: Types.ObjectId | string): Promise<Response>;
    deActivateToken(studentId: Types.ObjectId | string): Promise<Response>;
    getByStudentId(id: Types.ObjectId | string): Promise<Array<HydratedDocument<StudentToken, StudentTokenMethods>>>;
    getById(id: Types.ObjectId | string): Promise<HydratedDocument<StudentToken, StudentTokenMethods> | null>;
    getByValue(tokenValue: string): Promise<HydratedDocument<StudentToken, StudentTokenMethods> | null>;
    getActiveToken(
        studentId: Types.ObjectId | string,
        session: string,
        semester: string,
    ): Promise<HydratedDocument<StudentToken, StudentTokenMethods>>;
}

const StudentTokenSchema = new Schema<StudentToken, StudentTokenModelStatics, StudentTokenMethods>({
    studentId: { type: String, required: true, unique: true },
    value: { type: String, required: true,},
    level: { type: String, required: true,},
    session: { type: String, required: true,},
    semester: { type: String, required: true,},
    createdAt: { type: Date, default: Date.now },
})

StudentTokenSchema.method('isActive', async function isActive(school: School): Promise<boolean> {
    return this.session === school.currentSession && this.semester === school.currentSemester;
});

StudentTokenSchema.static('createToken', async function createToken(token: CreateStudentToken): Promise<HydratedDocument<StudentToken, StudentTokenMethods>> {

    return await this.create({ 
        studentId: token.studentId,
        value: token.value,
        level: token.level,
        session: token.session,
        semester: token.semester,
    });
});

StudentTokenSchema.static('activateToken', async function activateToken(studentId: Types.ObjectId | string): Promise<Response> {
    await this.updateOne(
        { studentId: studentId},
        { $set: {status: tokenStatus.active} }
    );

    const studentToken = await this.findOne({ studentId: studentId });

    return ({status: 201, error: false, data: studentToken});
});

StudentTokenSchema.static('deActivateToken', async function deActivateToken(studentId: Types.ObjectId | string): Promise<Response> {
    await this.updateOne(
        { studentId: studentId }, 
        { $set: {status: tokenStatus.expired} }
    );

    const studentToken = await this.findOne({ studentId: studentId });

    return ({status: 201, error: false, data: studentToken});
});

StudentTokenSchema.static('getById', async function getById(id: Types.ObjectId | string): Promise<HydratedDocument<StudentToken, StudentTokenMethods> | null> {
    const token = await this.findOne({ _id: id });
    return token;
});

StudentTokenSchema.static('getByStudentId', async function getByStudentId(id: Types.ObjectId | string): Promise<Array<HydratedDocument<StudentToken, StudentTokenMethods>>> {
    const tokens = await this.find({ studentId: id });
    return tokens;
});

StudentTokenSchema.static('getByValue', async function getByValue(tokenValue: string): Promise<HydratedDocument<StudentToken, StudentTokenMethods> | null> {
    const token = await this.findOne({ value: tokenValue });
    return token;
});

StudentTokenSchema.static('getActiveToken', async function getActiveToken(
    studentId: Types.ObjectId | string,
    session: string,
    semester: string,
): Promise<HydratedDocument<StudentToken, StudentTokenMethods> | null> {
    const token = await this.findOne(
        { $and: [{studentId: studentId}, {session: session}, {semester: semester}] }
    );
    return token;
});


const StudentTokenModel = model<StudentToken, StudentTokenModelStatics>('StudentToken', StudentTokenSchema);
export default StudentTokenModel;