import { studentTokenController } from "@/api/web/controllers/student";
import { NextRequest, NextResponse } from "next/server";


interface Params {
    params: Promise<{
        id: string;
    }>
}

 export async function POST(req: NextRequest, params: Params) {
    return studentTokenController.authenticateToken(req, params);
}