import schoolController from "@/api/web/controllers/school";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const school = {
        name: 'school name',
        currentSession: '2025/2026',
        currentSemester: '1',
        totalNumberOfStudents: 100,
        departments: {
            total: 3,
            data: [
                {
                    nameOfDepartment: "CHEW",
                    totalStudentsInDepartment: 10,
                    studentsAtEachLevel: [
                        {
                            level: 100,
                            totalStudents: 2
                        },
                        {
                            level: 200,
                            totalStudents: 5
                        },
                        {
                            level: 300,
                            totalStudents: 3
                        }
                    ]
                },

                {
                    nameOfDepartment: "MLT",
                    totalStudentsInDepartment: 10,
                    studentsAtEachLevel: [
                        {
                            level: 100,
                            totalStudents: 2
                        },
                        {
                            level: 200,
                            totalStudents: 5
                        },
                        {
                            level: 300,
                            totalStudents: 3
                        }
                    ]
                },
                {
                    nameOfDepartment: "PHRM",
                    totalStudentsInDepartment: 10,
                    studentsAtEachLevel: [
                        {
                            level: 100,
                            totalStudents: 2
                        },
                        {
                            level: 200,
                            totalStudents: 5
                        },
                        {
                            level: 300,
                            totalStudents: 3
                        }
                    ]
                }
            ]
        }
    }
    return NextResponse.json({
        message: "school gotten succesfully",
        data:school
    });
}