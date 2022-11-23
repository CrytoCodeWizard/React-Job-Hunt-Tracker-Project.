import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { User } from "../models/User";
import { createJWT } from "../utilities/auth";

export const register = async (req: Request, res: Response) => {
  const newUser = await User.create(req.body);

  const token = createJWT({ userId: newUser.id, userName: newUser.name });

  res.status(StatusCodes.CREATED).json({ user: { name: newUser.name }, token });
};
