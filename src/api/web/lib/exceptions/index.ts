import { exceptionsInterface } from "../../../exceptions";
import { JSONErrorResponse } from "../responses";
import { NextResponse } from 'next/server.js';


const logs = {
    handleUserException(
        res: NextResponse | Response, 
        status: number, 
        errorExist: boolean, 
        message: string, 
        error: any
    ) {
        const response: JSONErrorResponse = {
            status,
            error: errorExist,
            message,
        }
         
        // this.sendErrorLogsToExceptionsTier(error);
        exceptionsInterface.collect(error);
        return Response.json(response);
    },
    // sendErrorLogsToExceptionsTier(err) {
    //     exceptionsInterface.collect(err);
    // }
}


export default logs;