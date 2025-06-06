// Este archivo define un middleware para manejar errores en controladores asíncronos de Express.
import { Request, Response, NextFunction } from 'express';


type AsyncController = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const catchAsync = (fn: AsyncController) => {
  return (req: Request, res: Response, next: NextFunction) => {

    /*Envuelve la ejecución de la función del controlador en un Promise.resolve()
      para asegurar que siempre sea una promesa, y maneja cualquier error
      pasándolo a la función next() de Express.
    */
   
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};