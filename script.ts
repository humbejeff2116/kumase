import { studentService } from "./src/api/web/services/student";
import path from "node:path";
import fs from 'node:fs';
import connectToDatabase, { dbTypes } from "./src/api/database/lib";

interface Students {
    school: string
    allStudents: Array<any>
}

export default async function getAllStudents() {
    await connectToDatabase(dbTypes.mongoDB);
    const studentsFilePath = path.join(process.cwd(), 'src/data/students/students-lock.json');
    const students = await studentService.getAll();
    
    const records: Students = {
        school: "Kumase College of Health Tchnology",
        allStudents: students
    }

    if (!fs.existsSync(studentsFilePath)) {
        const dir = path.dirname(studentsFilePath);
        fs.mkdirSync(dir, {recursive: true});
    }

    fs.writeFile(studentsFilePath, JSON.stringify(records, null, 2), (err) => {
        if (err) {
            console.error('err saving students', err)
        }
        console.log('students saved succesfully');
        process.exit();
    });
}

getAllStudents();