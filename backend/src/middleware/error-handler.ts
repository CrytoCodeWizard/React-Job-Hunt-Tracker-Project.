import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: error.message,
  });
  next(error);
};
