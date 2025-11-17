import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET as string || 'secret';
const dura =  '1h';


export const generateToken = (userid: string,file: string ,role: string): string => {
    const carga = {userid: userid,file:file, role: role };

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

export const decodeToken = (token: string): any => {
    try {
        return jwt.decode(token);
        
    } catch (error) {

        console.error("Token decoding failed:", error);
        return null;
    }
};