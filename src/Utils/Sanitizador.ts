import { body } from 'express-validator';

export const professorValidationRules = [
    body('nombre').trim().notEmpty().withMessage('Name is required'),
    body('apellido').trim().notEmpty().withMessage('Last name is required'),
    body('email').normalizeEmail().isEmail().withMessage('Invalid email'),
    body('dni').trim().isLength({ min: 8, max: 10 }).withMessage('DNI must be 8-10 characters'),
    body('telefono').trim().isMobilePhone('any').withMessage('Invalid phone number'),
    body('titulo').trim().notEmpty().withMessage('Title is required'),
    body('disponibilidad_horaria').isJSON().withMessage('Invalid schedule format')
];