import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { IUser } from "../models/interfaces/User";
import { User } from "../models/User";

import { createJWT, passwordCheck } from "../utilities/auth";

export const register = async (req: Request, res: Response) => {
  const newUser = await User.create(req.body);

  const token = createJWT({
    userId: newUser.id,
    userName: newUser.name,
  });

  res.status(StatusCodes.CREATED).json({ user: { name: newUser.name }, token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password }: IUser = req.body;
  if (!email || !password) throw new Error("Password and Email are required!");

  const user = await User.findOne({ email });
  if (!user) throw new Error(`User with email: ${email} does not exist!`);

  if (!(await passwordCheck(password, user.password)))
    throw new Error(`Incorrect Password!`);

  const token = createJWT({ userId: user.id, userName: user.name });
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};
