import jwt from 'jsonwebtoken';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import configs from '../../configs';
import { secret } from '../jwt';


function signJsonWebToken(user: any) {
    const { email, _id } = user;
    const token_payload = { email, id: _id };
    const token = jwt.sign(token_payload, secret, { expiresIn: '1h' });
    return token;
}


// export function define__dirname() {
//     const __filename = fileURLToPath(import.meta.url);
//     const __dirname = path.dirname(__filename);
//     return __dirname;
// }

const exclude = ["password", "createdAt"];
async function filterUser(obj: any) {
    for (let i = 0; i < exclude.length; i++) {
        if (obj[exclude[i]]) {
            obj[exclude[i]] = null;
        }
    }
    return obj; 
}


export {
    signJsonWebToken,
    filterUser
}