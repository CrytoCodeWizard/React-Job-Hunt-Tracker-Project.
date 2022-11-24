import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

export interface JwtUserPayload extends jwt.JwtPayload {
  userId: ObjectId;
  userName: string;
}
