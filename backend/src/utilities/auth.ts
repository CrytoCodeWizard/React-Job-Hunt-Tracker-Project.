import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { settings } from "../config/settings";

export const hashPassword = async (password: string) =>
  await bcrypt.hash(password, await bcrypt.genSalt());

export const createJWT = (object: object) =>
  jwt.sign(object, settings.jwtSecret);
