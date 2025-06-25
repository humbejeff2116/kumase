import { studentController } from "@/api/web/controllers/student";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    params : Promise<{
        id: string
        accountId: string
    }>
}
export async function GET(req: NextRequest, res: NextResponse) {
    return studentController.getStudent(req, res); 
}