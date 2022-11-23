import dotenv from "dotenv";
dotenv.config();

export const settings = {
  port: Number(process.env.PORT || 4000),
  dbUrl: process.env.DB_URL || "",
  jwtSecret: process.env.JWT_SECRET || "",
};
