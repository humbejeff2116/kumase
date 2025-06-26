import { studentAccountController } from "@/api/web/controllers/student";
import { NextRequest } from "next/server";


interface Params {
    params: Promise<{id: string}>
}
 export async function POST(req: NextRequest, params: Params) {
    return studentAccountController.logOut(req, params);
}