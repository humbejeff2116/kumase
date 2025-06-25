import { 
    Schema, 
    model, 
    Types, 
    Model, 
    HydratedDocument 
} from 'mongoose';
import { School } from '../school';


export interface CourseReg {
    level: string
    session: string
    semester: string
    time: string | number
}

export interface PurchasedToken {
    level: string
    session: string
    semester: string
    time: string | number | null
}

export interface Student {
    _id?: string
    // id?: string
    contactNumber?: string
    profileImage?: string
    title?: string
    surname?: string
    firstName?: string
    otherName?: string
    maritalStatus?: string
    gender?: string
    dateOfBirth?: string
    nationality?: string
    stateOfOrigin?: string
    regNo?: string
    department?: string
    course?: string
    level: string
    email?: string
    purchasedTokens?: Array<PurchasedToken>
    registeredCourses?: Array<CourseReg>
    createdAt?: Date,
}

interface Response {
    status: number,
    error: boolean, 
    data: any
}

interface StudentMethods {
    checkPassword(): (err: Error, isMatch: boolean) => void;
    registeredCourse(school: School): boolean; 
}

interface StudentModelStatics extends Model<Student, object, StudentMethods> {
    createStudent(user: Student): Promise<HydratedDocument<Student, StudentMethods>>;
    getAll(): Promise<Array<HydratedDocument<Student, StudentMethods>>>;
    getByRegNo(regNo: string): Promise<HydratedDocument<Student, StudentMethods> | null>;
    getById(id: Types.ObjectId | string): Promise<HydratedDocument<Student, StudentMethods> | null>;
    addPurchaseToken(id: Types.ObjectId | string, purchasedToken: PurchasedToken): Promise<Response>;
    regCourse(id: Types.ObjectId | string, courseReg: CourseReg): Promise<Response>;
    updateProfileImage(id: Types.ObjectId | string, profileImage: string): Promise<Response>;
    getStudentsIds(): Promise<Array<HydratedDocument<Student, StudentMethods>>>;
}

const StudentSchema = new Schema<Student, StudentModelStatics, StudentMethods>({
    contactNumber: { type: String },
    profileImage: { type: String },
    title: { type: String },
    surname: { type: String },
    firstName: { type: String },
    otherName: { type: String },
    maritalStatus: { type: String },
    gender: { type: String },
    dateOfBirth: { type: String },
    nationality: { type: String },
    stateOfOrigin: { type: String },
    regNo: { type: String },
    department: { type: String },
    course: { type: String },
    level: { type: String },
    purchasedTokens: [{}],
    registeredCourses: [{}],
    createdAt: { type: Date, default: Date.now },
})

StudentSchema.static('createStudent', async function createStudent(student: Student): Promise<HydratedDocument<Student, StudentMethods>> {

    return await this.create({
        title: student.title,
        surname: student.surname,
        firstName: student.firstName,
        otherName: student.otherName,
        maritalStatus: student.maritalStatus,
        gender: student.gender,
        dateOfBirth: student.dateOfBirth,
        nationality: student.nationality,
        stateOfOrigin: student.stateOfOrigin,
        regNo: student.regNo,
        department: student.department,
        course: student.course,
        level: student.level,
        registeredCourses: student.registeredCourses
    });

});

StudentSchema.method('registeredCourse', function registeredCourse(school: School): boolean {
    const regCourses = this.registeredCourses;
    const level = this.level;

    if (!regCourses || regCourses.length < 1) {
        return false;
    }
    
    const course = regCourses.find(elem => elem.session === school.currentSession && elem.semester === school.currentSemester && elem.level === level)
    return course ? true : false;
});

StudentSchema.static('getAll', async function getAll(): Promise<Array<HydratedDocument<Student,StudentMethods>>> {
    const users = await this.find({});
    return users;
});

StudentSchema.static('getByRegNo', async function getByRegNo(regNo: string): Promise<HydratedDocument<Student, StudentMethods> | null> {
    const student = await this.findOne({ regNo });
    return student;
});

StudentSchema.static('getById', async function getById(id: Types.ObjectId | string): Promise<HydratedDocument<Student, StudentMethods> | null> {
    const user = await this.findOne({ $or: [{_id: id }, {regNo: id}]});
    return user;
});

StudentSchema.static('updateProfileImage', async function updateProfileImage(id: Types.ObjectId | string, profileImage: string): Promise<Response> {
    await this.updateOne(
        { _id: id }, 
        { "$set": {"profileImage": profileImage} 
    });

    const user = await this.findOne({ _id: id }, {createdAt: 0});
    return ({status: 201, error: false, data: user});
});

StudentSchema.static('addPurchaseToken', async function addPurchaseToken(id: Types.ObjectId | string, purchasedToken: PurchasedToken): Promise<Response> {
    await this.updateOne(
        { _id: id }, 
        { $push: {purchasedTokens: purchasedToken} 
    });

    const user = await this.findOne({ _id: id }, {createdAt: 0});
    return ({status: 201, error: false, data: user});
});

StudentSchema.static('regCourse', async function regCourse(id: Types.ObjectId | string, courseReg: CourseReg): Promise<Response> {
    await this.updateOne(
        { _id: id }, 
        { $push: {registeredCourses: courseReg} 
    });

    const user = await this.findOne({ _id: id }, {createdAt: 0});
    return ({status: 201, error: false, data: user});
});


StudentSchema.static('getStudentsIds', async function getStudentsIds(): Promise<Array<HydratedDocument<Student, StudentMethods>>> {
    const students = await this.find({}, {
        contactNumber: 0,
        profileImage: 0,
        title: 0,
        surname: 0,
        firstName: 0,
        otherName: 0,
        maritalStatus: 0,
        gender: 0,
        dateOfBirth: 0,
        nationality: 0,
        stateOfOrigin: 0,
        regNo: 0,
        department: 0,
        course: 0,
        level: 0,
        purchasedTokens: 0,
        registeredCourses: 0,
        createdAt: 0,
    });

    return students;
});

const StudentModel = model<Student, StudentModelStatics>('Student', StudentSchema);
export default StudentModel;