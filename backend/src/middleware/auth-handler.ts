import { NextFunction, Response } from "express";
import { BEARER_JWT } from "../utilities/auth";

import { CustomRequest } from "../interfaces/CustomRequest";
import { JwtUserPayload } from "../interfaces/JwtUserPayload";
import { getJwtFromHeaders, verifyJWT } from "../utilities/auth";
import { CustomError } from "../utilities/errors";
import { StatusCodes } from "http-status-codes";

export const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith(BEARER_JWT))
    throw new CustomError("Authentication failed!", StatusCodes.UNAUTHORIZED);

  const token = getJwtFromHeaders(authHeaders);

  try {
    const userPayload = verifyJWT(token) as JwtUserPayload;

    req.userPayload = {
      userId: userPayload.userId,
      userName: userPayload.userName,
    };

    next();
  } catch (error) {
    throw new CustomError(`${error}`, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
