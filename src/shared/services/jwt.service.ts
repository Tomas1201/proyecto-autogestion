import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET as string || 'secret';
const dura =  '1h';


export const generateToken = (userid: string, role: string): string => {
    const carga = {userid: userid, role: role };

    const token=jwt.sign(carga, JWT_SECRET, {expiresIn: dura});
    return token;
};


export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {

        console.error("Token verification failed:", error);
        return null;
    }
};