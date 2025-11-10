import {
  generateToken,
  verifyToken,
  decodeToken,
} from "../services/jwt.service.js";
import { Request,Response, NextFunction } from 'express';

export enum ROLES {
  ADMIN,
  USER,
  PROFESSOR,
}


export const authorize = (allowedRoles: ROLES[]) => {
    
    return (req: Request, res: Response, next: NextFunction) => {
        
        const {jwt_token} = req.cookies;
        if (!jwt_token) {
        
            res.status(401).json({ message: 'No autenticado. Token de usuario no encontrado.' })
            return;
        }
        const decoded = decodeToken(jwt_token);
        if (!decoded) {
             res.status(401).json({ message: 'No autenticado. Token inválido.' });
             return;
        }
        const {role} = decoded;
        const userRole = role as ROLES;
        if (!userRole) {
            res.status(401).json({ message: 'No autenticado. Rol de usuario no encontrado.' });
            return;
        }
        
        if (allowedRoles.includes(userRole)) {
            // Si el rol está permitido, continuamos con el siguiente manejador de ruta
            next();
        } else {
        
            res.status(403).json({ 
                message: `Acceso prohibido. Rol "${userRole}" no tiene permisos para esta acción.` 
            });
            return;
        }
    };
};

