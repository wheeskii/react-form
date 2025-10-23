import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ZodTypeAny, ZodError } from "zod";

export const validate = <T extends ZodTypeAny>(schema: T) => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const parsed = schema.parse(req.body);
        req.body = parsed;
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error,
          });
        }
        next(error);
      }
    };
  };
  