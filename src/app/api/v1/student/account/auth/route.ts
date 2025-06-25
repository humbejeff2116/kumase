import { studentAccountController } from "@/api/web/controllers/student";
import { NextRequest, NextResponse } from "next/server";

 export async function POST(req: NextRequest, res: NextResponse) {
    return studentAccountController.authenticateToken(req, res);
}