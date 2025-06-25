import { studentAccountController } from "@/api/web/controllers/student";
import { NextRequest } from "next/server";

 export async function POST(req: NextRequest) {
    return studentAccountController.signUp(req);
}