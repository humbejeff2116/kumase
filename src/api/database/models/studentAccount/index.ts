import { Schema, model, Types, Model, HydratedDocument, } from 'mongoose';
import bcrypt from 'bcryptjs';


export interface StudentAccount {
    _id?: Types.ObjectId,
    studentId: string,
    regNo: string,
    onboarded?: boolean
    password: string,
    createdAt?: Date,
}

interface Response {
    status: number,
    error: boolean, 
    data: any
}

interface StudentAccountMethods {
    checkPassword(): (err: Error, isMatch: boolean) => void; 
}

interface UserModelStatics extends Model<StudentAccount, object, StudentAccountMethods> {
    createAccount(user: StudentAccount): Promise<HydratedDocument<StudentAccount, StudentAccountMethods> | null>;
    getAll(): Promise<Array<HydratedDocument<StudentAccount, StudentAccountMethods>>>;
    getByRegNo(email: string): Promise<HydratedDocument<StudentAccount, StudentAccountMethods> | null>;
    getById(id: Types.ObjectId | string): Promise<HydratedDocument<StudentAccount, StudentAccountMethods> | null>;
}

const UserSchema = new Schema<StudentAccount, UserModelStatics, StudentAccountMethods>({
    studentId: { type: String, required: true, unique: true },
    regNo: { type: String, required: true, unique: true },
    onboarded: {type: Boolean, default: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
})

UserSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    this.password = await hashPassword(this.password);
})

async function hashPassword(password: string): Promise<string> {
    return new Promise((res, rej) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
               return rej(err);
            }
    
            bcrypt.hash(password, salt, (err, hashedpassword) => {
                if (err) {
                    return rej(err);
                }
                res(hashedpassword);
            })
        })
    })
}

UserSchema.method('checkPassword', function checkPassword(guess: string, done: (err: Error | null, isMatch: boolean) => void): void {
    bcrypt.compare(guess, this.password, function(err, isMatch) {
        done(err, isMatch);
    });
});


UserSchema.static('createAccount', async function createAccount(user: StudentAccount): Promise<HydratedDocument<StudentAccount, StudentAccountMethods>> {
    return await this.create({ 
        studentId: user.studentId,
        regNo: user.regNo,
        // onboarded: true,
        password: user.password,
    });
});

UserSchema.static('getAll', async function getAll(): Promise<Array<HydratedDocument<StudentAccount, StudentAccountMethods>>> {
    const users = await this.find({}, {
        password: 0
    });
    return users;
});

UserSchema.static('getByRegNo', async function getByRegNo(regNo: string): Promise<HydratedDocument<StudentAccount, StudentAccountMethods> | null> {
    const user = await this.findOne({ regNo });
    return user;
});

UserSchema.static('getById', async function getById(id: Types.ObjectId | string): Promise<HydratedDocument<StudentAccount, StudentAccountMethods> | null> {
    const user = await this.findOne({ _id: id }, {
        password: 0
    });
    return user;
});


const StudentAccountModel = model<StudentAccount, UserModelStatics>('StudentAccount', UserSchema);
export default StudentAccountModel;