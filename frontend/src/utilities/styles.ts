import { JobStatus } from "../components/Job/interfaces/jobs";

export const getColorFromJobStatus = (
  status: JobStatus,
  colorNumber?: number
) => {
  const output = [];

  status === JobStatus.DECLINED
    ? output.push("red")
    : status === JobStatus.INTERVIEW
    ? output.push("green")
    : output.push("orange");

  output.push(colorNumber !== undefined ? `.${colorNumber}` : "");
  return output.join("");
};
