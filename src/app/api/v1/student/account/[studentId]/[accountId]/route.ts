import { studentAccountController } from "@/api/web/controllers/student";
import { NextRequest } from "next/server";


interface Params {
    params: Promise<{studentId: string, accountId: string}>
}
 export async function PUT(req: NextRequest, params: Params) {
    return studentAccountController.updateAccountPass(req, params);
}