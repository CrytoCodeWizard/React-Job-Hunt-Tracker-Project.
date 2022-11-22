import express from "express";

import { connectToDB } from "./database/connect";
import { settings } from "./config/settings";

const app = express();

const run = async () => {
  try {
    await connectToDB();

    console.log("Connected to the database.");

    app.listen(settings.port, () => {
      console.log(`Server is running on port ${settings.port}.`);
    });
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req, res) => {
  res.send("API is running");
});

run();
