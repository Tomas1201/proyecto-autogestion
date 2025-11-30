import { Router } from "express";
import { CorrelationController } from "./correlation.controller.js";

export const correlationRouter = Router();
const controller = new CorrelationController();


correlationRouter.post(
  "/correlations",
  (req, res) => controller.create(req, res)
);


correlationRouter.get(
  "/careers/:careerId/correlations",
  (req, res) => controller.findByCareer(req, res)
);


correlationRouter.delete(
  "/correlations/:correlationId",
  (req, res) => controller.delete(req, res)
);
