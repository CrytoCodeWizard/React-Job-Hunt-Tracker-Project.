import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { settings } from "../config/settings";
import { JwtUserPayload } from "../interfaces/JwtUserPayload";

export const hashPassword = async (password: string) =>
  await bcrypt.hash(password, await bcrypt.genSalt());

export const passwordCheck = async (
  password: string,
  correctPassword: string
) => {
  return await bcrypt.compare(password, correctPassword);
};

export const createJWT = (object: JwtUserPayload) =>
  jwt.sign(object, settings.jwtSecret);

export const verifyJWT = (token: string) => {
  return jwt.verify(token, settings.jwtSecret);
};

export const getJwtFromHeaders = (headers: string) => {
  return headers.split(" ")[1];
};

export const BEARER_JWT = "Bearer ";
