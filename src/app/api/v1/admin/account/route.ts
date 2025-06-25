import adminController from "@/api/web/controllers/admin";
import { NextRequest, NextResponse } from "next/server";


 export async function POST(req: NextRequest, res: NextResponse) {
    return adminController.signIn(req, res);
}

