import { studentController } from "@/api/web/controllers/student";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    return studentController.onboard(req);
}
