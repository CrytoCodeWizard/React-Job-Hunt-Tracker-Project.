import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRouter from "./routes/auth";
import jobsRouter from "./routes/jobs";

import { connectToDB } from "./database/connect";
import { settings } from "./config/settings";

import { notFoundMiddleware } from "./middleware/not-found";
import { errorHandlerMiddleware } from "./middleware/error-handler";
import { authMiddleware } from "./middleware/auth-handler";

const run = async () => {
  try {
    await connectToDB();
    console.log("Connected to the database.");

    const app = express();

    if (process.env.NODE_ENV === "production") {
      app.set("trust proxy", 1);
      app.disable("x-powered-by");
      app.use(
        "/api",
        rateLimit({
          windowMs: 15 * 60 * 1000, // 15 minutes
          max: 100,
          standardHeaders: true,
          legacyHeaders: false,
        })
      );
      app.use(helmet());
    }

    app.use(express.json());
    app.use(cors());

    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/jobs", authMiddleware, jobsRouter);

    app.use(notFoundMiddleware);
    app.use(errorHandlerMiddleware);

    app.listen(settings.port, () => {
      console.log(`Server is running on port ${settings.port}.`);
    });
  } catch (error) {
    console.log(error);
  }
};

run();
