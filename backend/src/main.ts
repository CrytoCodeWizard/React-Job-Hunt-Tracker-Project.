import express from "express";

import { connectToDB } from "./database/connect";
import { settings } from "./config/settings";

import { notFoundMiddleware } from "./middleware/not-found";
import { errorHandlerMiddleware } from "./middleware/error-handler";

import authRouter from "./routes/auth";
import jobsRouter from "./routes/jobs";
import { authMiddleware } from "./middleware/auth-handler";

const run = async () => {
  try {
    await connectToDB();

    console.log("Connected to the database.");

    const app = express();

    app.use(express.json());

    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/jobs", authMiddleware, jobsRouter);

    app.use(errorHandlerMiddleware);
    app.use(notFoundMiddleware);

    app.listen(settings.port, () => {
      console.log(`Server is running on port ${settings.port}.`);
    });
  } catch (error) {
    console.log(error);
  }
};

run();
