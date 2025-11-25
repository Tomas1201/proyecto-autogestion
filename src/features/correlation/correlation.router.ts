import { Router } from "express";
import { CorrelationController } from "./correlation.controller.js";

export const correlationRouter = Router();
const controller = new CorrelationController();

// Create a new correlation
correlationRouter.post(
  "/correlations",
  (req, res) => controller.create(req, res)
);

// Get all correlations for a career
correlationRouter.get(
  "/careers/:careerId/correlations",
  (req, res) => controller.findByCareer(req, res)
);

// Delete a correlation
correlationRouter.delete(
  "/correlations/:correlationId",
  (req, res) => controller.delete(req, res)
);
