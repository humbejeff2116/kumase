import { Schema, model, Types, Model, HydratedDocument, } from 'mongoose';
import bcrypt from 'bcryptjs';

export const userRoles = {
    admin: 'admin',
    student: 'student',
}
export interface Admin {
    _id?: Types.ObjectId,
    password: string,
    createdAt?: Date,
    role: string
}

interface Response {
    status: number,
    error: boolean, 
    data: any
}

interface UserMethods {
    checkPassword(): (err: Error, isMatch: boolean) => void; 
}

interface UserModelStatics extends Model<Admin, object, UserMethods> {
    createAccount(user: Admin): Promise<HydratedDocument<Admin, UserMethods>>;
    getAll(): Promise<Array<HydratedDocument<Admin, UserMethods>>>;
    get(): Promise<HydratedDocument<Admin, UserMethods>>;
    getById(id: Types.ObjectId | string): Promise<HydratedDocument<Admin, UserMethods> | null>;
}

const UserSchema = new Schema<Admin, UserModelStatics, UserMethods>({
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
    bcrypt.compare(guess, this.password, function(err: Error | null, isMatch) {
        done(err, isMatch);
    });
});


UserSchema.static('createAccount', async function createAccount(user: Admin): Promise<HydratedDocument<Admin, UserMethods>> {
    console.log("user in admin model", user);

    return await this.create({ 
        password: user.password,
        role: user.role
    });
});

UserSchema.static('getAll', async function getAll(): Promise<Array<HydratedDocument<Admin, UserMethods>>> {
    const users = await this.find({}, {
        password: 0
    });
    return users;
});

UserSchema.static('get', async function get(): Promise<HydratedDocument<Admin, UserMethods>> {
    const user = await this.find({}, {
        password: 0
    });
    return user[0];
});


UserSchema.static('getById', async function getById(id: Types.ObjectId | string): Promise<HydratedDocument<Admin, UserMethods> | null> {
    const user = await this.findOne({ _id: id }, {
        password: 0
    });
    return user;
});


const AdminAccountModel = model<Admin, UserModelStatics>('AdminAccount', UserSchema);
export default AdminAccountModel;