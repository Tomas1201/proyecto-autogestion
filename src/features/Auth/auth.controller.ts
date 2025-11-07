// src/controllers/auth.controller.ts (Ejemplo de Login)
import { Request, Response } from 'express';
import { generateToken, JwtPayload } from '..../shared/services/jwt.service.js';


export async const login(req: Request, res: Response) => {
    const { username, password } = req.body;

   
    const user = await verificarUsuario(username, password); // Función ficticia de ejemplo
    if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }


    const payload: JwtPayload = {
        userId: user.id.toString(),
        role: user.role,
    };
    const token = generateToken(payload);

    res.cookie('jwt_auth', token, {
        httpOnly: true, // ESENCIAL: No accesible por JS del cliente (defensa contra XSS)
        secure: process.env.NODE_ENV === 'production', // Solo si es HTTPS
        sameSite: 'strict', // O 'lax' (defensa contra CSRF)
        maxAge: 3600000, // 1 hora en milisegundos (debe coincidir con la expiración del token)
    });

    return res.status(200).json({ message: 'Login exitoso', user: { id: user.id, role: user.role } });
};