import { validationResult } from 'express-validator';
import { Request, Response } from 'express';
import { NextRequest } from 'next/server';



export default function validateForm(req: NextRequest) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) { 
        const response = {
            status: 422,
            error: true,
            alreadySubscribed: true,
            valErrors: errors.array(),
            message:"Form validation failed",
        }
        return ({error: true, status: 422, valErrors: errors.array()}) 
    }
    return ({error: false, status: null, valErrors: null})
} 