import mongoose from "mongoose";
import { settings } from "../config/settings";

export const connectToDB = () => mongoose.connect(settings.dbUrl);
