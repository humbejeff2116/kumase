import { studentController } from "@/api/web/controllers/student";
import { NextRequest, NextResponse } from "next/server";

 export async function POST(req: NextRequest, res: NextResponse) {
    return studentController.getAll(req, res);
}