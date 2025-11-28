// src/controllers/auth.controller.ts (Ejemplo de Login)
import { Request, Response } from 'express';
import { AuthService } from "./auth.service.js";
import { sys } from 'typescript';


const authService = AuthService.getInstance();

export const login = async (req: Request, res: Response): Promise<any> =>{
    try {
        //Que pasa si ya tiene cookie?
        // const {jwt_auth} = req.cookies

        const { file, password } = req.body;

        // Validar credenciales
        const user = await authService.validateUser(file, password);
        console.log(user)
        if (user === null) {
        res.status(401).json({ message: 'Credenciales inválidas o usuario no existe' });
        return;
        }

          
        // Configurar cookie segura
        res.cookie('jwt_auth', user, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
            maxAge: 3600000, 
        });

         res.status(200).json({
            message: 'Login exitoso', token: user
        });
        return;
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    }
};

export const register = async (req: Request, res: Response): Promise<any> =>{
    try {
        const data = req.body;
        console.log(data)
        const existingUser = await authService.validateNewUser(data);
        console.log(existingUser)
        
        if (existingUser) {
            res.status(409).json({ message: 'El usuario ya existe' });
            return;
        }
        

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
        return;
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    }
}