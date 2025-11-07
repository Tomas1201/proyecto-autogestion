import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export interface JwtPayload {
    userId: string;
    role: 'ADMIN' | 'USER' | 'PROFESSOR';
}


export const generateToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
    });
};


export const verifyToken = (token: string): JwtPayload | null => {
    try {
        return jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch (error) {

        console.error("Token verification failed:", error);
        return null;
    }
};