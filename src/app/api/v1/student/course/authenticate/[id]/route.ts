
import { studentController } from "@/api/web/controllers/student";
import { NextRequest } from "next/server";


interface Params {
    params: Promise<{
        id: string;
    }>
}

export async function GET(req: NextRequest, params: Params) {
    return studentController.authCourseReg(req, params);
}