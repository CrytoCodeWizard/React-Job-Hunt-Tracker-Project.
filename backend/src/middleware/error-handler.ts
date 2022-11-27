import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../utilities/errors";

export const errorHandlerMiddleware = async (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: error.message,
  });
  next(error);
};
