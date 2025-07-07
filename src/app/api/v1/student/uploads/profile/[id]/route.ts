import { studentController } from "@/api/web/controllers/student";
import { NextRequest, NextResponse } from "next/server";


interface Params {
    params: Promise<{ id: string }>
}


// Disable Next.js body parsing to handle file uploads
// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };
export async function POST(req: NextRequest, res: NextResponse, params: Params) { 
    return studentController.updateProfileImage(req, params);
}

export async function GET(req: NextRequest, res: NextResponse, params: Params) { 
    return studentController.getProfileImage(req, params);
}