import { model, Schema } from "mongoose";
import { hashPassword } from "../utilities/auth";
import { validEmailRegex } from "../utilities/regex";
import { IUser } from "./interfaces/User";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Name is required!"],
    trim: true,
    minLength: 1,
    maxLength: 20,
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    match: [validEmailRegex, "Please enter a valid email address!"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Password is required!"],
    minlength: 6,
  },
});

userSchema.pre("save", async function () {
  this.password = await hashPassword(this.password);
});

export const User = model<IUser>("User", userSchema);
