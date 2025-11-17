// src/middleware/hashPassword.middleware.ts
import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const hashPassword = async (
  password: string
)  => {
  

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    password = hashedPassword;

    return password;
  } catch (error) {
    console.error("Error hasheando la contraseña:", error);
    return "";
  }
};

export const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error("Error verificando la contraseña:", error);
    throw new Error("Error interno del servidor al verificar la contraseña.");
  }
};
