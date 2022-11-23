import { Request, Response } from "express";

export const notFoundMiddleware = (req: Request, res: Response) =>
  res.status(404).send("Not found!");
