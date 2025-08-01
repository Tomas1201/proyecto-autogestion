import { Request, Response, NextFunction } from "express";

const authMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.headers["rol"];

    if (!user || !roles.includes(user as string)) {
      res.status(403).json({ error: "Acceso denegado" });
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
  const user = req.headers["rol"];

  if (user !== "admin") {
    res
      .status(403)
      .json({ error: "Acceso denegado: no tiene permisos suficientes." });
    return;
  }

  next();
};

export { authMiddleware, authorizeAdmin };
