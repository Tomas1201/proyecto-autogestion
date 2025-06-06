import { Request, Response, NextFunction } from 'express';

// Define un tipo para tus controladores asíncronos
type mensaje = (req: Request, res: Response) => Promise<any>;

export const Normalizador = (fn: mensaje) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Envuelve la ejecución de la función del controlador en un Promise.resolve()
    // para asegurar que siempre sea una promesa, y maneja cualquier error
    // pasándolo a la función next() de Express.
    Promise.resolve(fn(req, res));
  };
}