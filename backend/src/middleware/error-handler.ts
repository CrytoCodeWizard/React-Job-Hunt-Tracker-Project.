import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utilities/errors";

export const errorHandlerMiddleware = async (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.statusCode).json({
    message: error.message,
  });
  next(error);
};
