import { nanoid } from 'nanoid';


class StudentTokenHandler {
    generateToken(length?: number) {
        const tokenValue = nanoid(length || 12); 
        return tokenValue;
    }
}

const studentTokenHandler = new StudentTokenHandler();
export default studentTokenHandler;