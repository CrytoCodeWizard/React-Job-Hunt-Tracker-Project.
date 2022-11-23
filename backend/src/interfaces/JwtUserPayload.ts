import jwt from "jsonwebtoken";

export interface JwtUserPayload extends jwt.JwtPayload {
  userId: string;
  userName: string;
}
