import multer from 'multer';
import DataURI from 'datauri/parser.js';
import path from 'node:path';
import fs from 'node:fs';
// import studentService from '../../services/student/student.js';
import { Request } from 'express';
// import { studentService } from '../../services';
import { NextRequest } from 'next/server';
import { studentService } from '../../services/student';


const datauri = new DataURI();
const fileDestination = path.join('public', 'images', 'profile');
const profileImagePath = path.join('images', 'profile');

const storage = multer.diskStorage({
    destination: async function (req: Request, file: any, cb: (arg0: null, arg1: string) => void) {
        const { userId } = req.params;
        
        try {
            if (!fs.existsSync(fileDestination)) {
                fs.mkdirSync(fileDestination, { recursive: true })     
            }

            const user = await studentService.getStudentById(userId);

            if (user) {
                const profileImagePath = user.profileImage;

                if (profileImagePath && fs.existsSync(profileImagePath)) {
                    fs.unlink(profileImagePath, err => {
                        if (err) throw err;
                        return cb(null, fileDestination);
                    })     
                } else {
                    return cb(null, fileDestination);
                }
            }
        } catch (err) {
            throw err;
        }
    },

    filename: function (req: Request, file: any, cb: (arg0: null, arg1: string) => void) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const multerUploads = multer({ storage }).single('profileImage');

/**
 * @param {Object} req
 * @returns an array of url strings
 */
const imageDataUri = (req: { body?: any; file: any; }) => {
    const urlString = path.extname(req.file.originalname).toString();

    return datauri.format(urlString, req.file.buffer);
}

export { 
    multerUploads, 
    imageDataUri,
    profileImagePath
}