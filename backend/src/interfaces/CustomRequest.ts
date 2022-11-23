import { Request } from "express";
import { JwtUserPayload } from "./JwtUserPayload";

export interface CustomRequest extends Request {
  userPayload?: JwtUserPayload;
}
