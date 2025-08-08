/*
import { Request, Response, NextFunction } from "express";

const authMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRole = req.headers["role"];

    if (!userRole || !roles.includes(userRole as string)) {
      res.status(403).json({ error: "Access denied" });
      return;
    }

    next();
  };
};

const authorizeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userRole = req.headers["role"];

  if (userRole !== "admin") {
    res.status(403).json({ error: "Access denied: insufficient permissions" });
    return;
  }

  next();
};

export { authMiddleware, authorizeAdmin };*/