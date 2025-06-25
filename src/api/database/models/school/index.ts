import { Schema, model, Types, Model, HydratedDocument, } from 'mongoose';


export interface School {
    _id?: Types.ObjectId
    name: string
    address: string
    currentSession: string
    currentSemester: string
    createdAt?: Date
}

interface Response {
    status: number,
    error: boolean, 
    data: any
}

interface SchoolMethods {
    isActive(): () => boolean; 
}

interface SchoolModelStatics extends Model<School, object, SchoolMethods> {
    createSchool(school: School): Promise<HydratedDocument<School, SchoolMethods>>;
    get(): Promise<HydratedDocument<School, SchoolMethods>>;
    updateSession(id: Types.ObjectId | string, session: string): Promise<Response>;
    updateSemester(id: Types.ObjectId | string, semester: string): Promise<Response>;
}

const SchoolSchema = new Schema<School, SchoolModelStatics, SchoolMethods>({
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true, unique: true },
    currentSession: { type: String, required: true, unique: true },
    currentSemester: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
})

SchoolSchema.static('createSchool', async function createSchool(school: School): Promise<HydratedDocument<School, SchoolMethods>> {

    return await this.create({ 
        name: school.name,
        address: school.address,
        currentSession: school.currentSession,
        currentSemester: school.currentSemester,
    });
});

SchoolSchema.static('updateSession', async function updateSession(id: Types.ObjectId | string, session: string): Promise<Response> {

    await this.updateOne(
        { _id: id }, 
        { $set: {currentSession: session} }
    );
   
    const school = await this.findOne({ _id: id });

    return ({status: 201, error: false, data: school});
});

SchoolSchema.static('updateSemester', async function updateSemester(id: Types.ObjectId | string, semester: string): Promise<Response> {

    await this.updateOne(
        { _id: id }, 
        { $set: {currentSemester: semester} }
    );
   
    const school = await this.findOne({ _id: id });

    return ({status: 201, error: false, data: school});
});

SchoolSchema.static('get', async function get(): Promise<HydratedDocument<School, SchoolMethods>> {
    const school = await this.find({});
    return school[0];
});

const SchoolModel = model<School, SchoolModelStatics>('school', SchoolSchema);
export default SchoolModel;


// {
//     name: 'Kumase College of Health Technology',
//     address: 'Beside Jolua Hospital Makurdi Benue state',
//     currentSession: '2025/2026',
//     currentSemester: '1'
// }