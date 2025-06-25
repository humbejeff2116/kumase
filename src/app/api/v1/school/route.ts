import schoolController from "@/api/web/controllers/school";
import { NextRequest, NextResponse } from "next/server";

 export async function GET(req: NextRequest, res: NextResponse) {
    return schoolController.get(req, res);
}