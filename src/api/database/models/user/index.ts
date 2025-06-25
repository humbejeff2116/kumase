import { Schema, model, Types, Model, HydratedDocument, } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface User {
    _id?: string
    id?: string
    contactNumber?: string
    profileImage?: string
    password: string
    onboarded?: boolean

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
    level?: string
    email: string
    createdAt?: Date,
}

interface Response {
    status: number,
    error: boolean, 
    data: any
}

interface UserMethods {
    checkPassword(): (err: Error, isMatch: boolean) => void; 
}

interface UserModelStatics extends Model<User, object, UserMethods> {
    createUser(user: User): Promise<HydratedDocument<User, UserMethods>>;
    onboardUser(userId: string, user: User): Promise<Response>;
    getAll(): Promise<Array<HydratedDocument<User, UserMethods>>>;
    getByEmail(email: string): Promise<HydratedDocument<User, UserMethods>>;
    getById(id: Types.ObjectId | string): Promise<HydratedDocument<User, UserMethods>>;
    updateProfileImage(id: Types.ObjectId | string, profileImage: string): Promise<Response>;
    getPurchaseHistory(userId: Types.ObjectId | string): Promise<HydratedDocument<User, UserMethods>>;
    updateNotificationStatus(userId: Types.ObjectId | string, hasActiveNotification: boolean): Promise<Response>;
}

const UserSchema = new Schema<User, UserModelStatics, UserMethods>({
    email: { type: String, required: true, unique: true },
    // userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactNumber: { type: String },
    profileImage: { type: String },
    onboarded: {type: Boolean},

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
    createdAt: { type: Date, default: Date.now },
})

UserSchema.pre('save', async function (next) {
    if (!this.password || !this.isModified("password")) {
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

UserSchema.static('createUser', async function createUser(user: User): Promise<HydratedDocument<User, UserMethods>> {
    console.log("user in model", user);

    return this.create({ 
        email: user.email,
        // userName: user.email,
        password: user.password,
    });
});

UserSchema.static('onboardUser', async function onboardUser(userId: string, user: User): Promise<Response> {
    console.log("user onboard in model", user);
    await this.create({ 
        title: user.title,
        surname: user.surname,
        firstName: user.firstName,
        otherName: user.otherName,
        maritalStatus: user.maritalStatus,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        nationality: user.nationality,
        stateOfOrigin: user.stateOfOrigin,
        regNo: user.regNo,
        department: user.department,
        course: user.course,
        level: user.level,
        // email: user.email,
        // onboarded: true
    });

    const onboardUser = await this.findOne({ _id: userId }, {
        password: 0,
        createdAt: 0
    });
    return ({status: 201, error: false, data: onboardUser});
});

UserSchema.static('getAll', async function getAll(): Promise<Array<HydratedDocument<User, UserMethods>>> {
    const users = await this.find({}, {
        password: 0
    });
    return users;
});

UserSchema.static('getByEmail', async function getByEmail(email: string): Promise<HydratedDocument<User, UserMethods> | null> {
    const user = await this.findOne({ email });
    return user;
});

UserSchema.static('getById', async function getById(id: Types.ObjectId | string): Promise<HydratedDocument<User, UserMethods> | null> {
    const user = await this.findOne({ _id: id }, {
        password: 0
    });
    return user;
});

UserSchema.static('updateProfileImage', async function updateProfileImage(id: Types.ObjectId | string, profileImage: string): Promise<Response> {
    await this.updateOne({ _id: id }, { "$set": {"profileImage": profileImage} });

    const user = await this.findOne({ _id: id }, {
        password: 0,
        createdAt: 0
    });
    return ({status: 201, error: false, data: user});
});

UserSchema.static('updateNotificationStatus', async function updateNotificationStatus(userId: Types.ObjectId | string, hasActiveNotification: boolean): Promise<Response> {
    const updateResponse = await this.updateOne(
        { _id: userId }, 
        { "$set": {"hasActiveNotification": hasActiveNotification} }
    );

    return ({status: 201, error: false, data: updateResponse});
});

const UserModel = model<User, UserModelStatics>('User', UserSchema);
export default UserModel;