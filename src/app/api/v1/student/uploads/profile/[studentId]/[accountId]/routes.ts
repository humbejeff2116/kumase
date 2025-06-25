import { studentController } from "@/api/web/controllers/student";
import { NextRequest, NextResponse } from "next/server";


interface Params {
    params: Promise<{
        accountId: string;
        studentId: string;
    }>
}


export async function POST(req: NextRequest, res: NextResponse, params: Params) { 
    return studentController.updateProfileImage(req, params);
}

export async function GET(req: NextRequest, res: NextResponse, params: Params) { 
    return studentController.getProfileImage(req, params);
}