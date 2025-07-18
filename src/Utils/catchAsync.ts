// Utils/catchAsync.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>; // <-- Este `any` permite `Promise<Response>`, `Promise<void>`, etc.

export const catchAsync = (fn: AsyncHandler): RequestHandler => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
