import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomRequest } from "../interfaces/CustomRequest";

import { IUser } from "../models/interfaces/User";
import { User } from "../models/User";

import { createJWT, passwordCheck } from "../utilities/auth";
import { CustomError } from "../utilities/errors";

export const register = async (req: Request, res: Response) => {
  const newUser = await User.create(req.body);

  const token = createJWT({
    userId: newUser.id,
    userName: newUser.name,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ method: "register", user: { name: newUser.name }, token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password }: IUser = req.body;
  if (!email || !password)
    throw new CustomError(
      "Password and Email are required!",
      StatusCodes.UNAUTHORIZED
    );

  const user = await User.findOne({ email });

  if (!user)
    throw new CustomError(
      `User with email: ${email} does not exist!`,
      StatusCodes.NOT_FOUND
    );

  if (!(await passwordCheck(password, user.password)))
    throw new CustomError(`Incorrect Password!`, StatusCodes.UNAUTHORIZED);

  const token = createJWT({
    userId: user.id,
    userName: user.name,
  });

  res
    .status(StatusCodes.OK)
    .json({ method: "login", user: { name: user.name }, token });
};
