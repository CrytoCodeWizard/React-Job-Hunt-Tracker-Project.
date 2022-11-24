import { model, Schema } from "mongoose";
import { JobStatus } from "./enums/JobStatus";
import { IJob } from "./interfaces/Job";

const jobSchema = new Schema<IJob>(
  {
    company: {
      type: String,
      required: [true, "Company is required!"],
      minlength: 1,
      maxlength: 100,
    },
    jobTitle: {
      type: String,
      required: [true, "Job title is required!"],
      minlength: 1,
      maxlength: 100,
    },
    status: {
      type: String,
      enum: JobStatus,
      message: "{VALUE} is not supported!",
      default: JobStatus.PENDING,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "CreatedBy is required!"],
    },
    userName: {
      type: String,
      required: [true, "UserName is required!"],
    },
  },

  { timestamps: true }
);

export const Job = model<IJob>("Job", jobSchema);
