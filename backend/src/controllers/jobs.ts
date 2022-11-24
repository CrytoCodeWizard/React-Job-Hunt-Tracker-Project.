import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomRequest } from "../interfaces/CustomRequest";
import { Job } from "../models/Job";
import { handleItemNotFound } from "../utilities/errors";

const findAll = async (req: CustomRequest, res: Response) => {
  const jobs = await Job.find({ createdBy: req.userPayload?.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json(jobs);
};

const findOne = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;

  const job = await Job.findById(req.params.id);
  handleItemNotFound(job, "job", id);

  res.status(StatusCodes.OK).json(job);
};

const create = async (req: CustomRequest, res: Response) => {
  const createdBy = req.userPayload?.userId;
  const userName = req.userPayload?.userName;

  res
    .status(StatusCodes.CREATED)
    .json(await Job.create({ ...req.body, createdBy, userName }));
};

const patch = async (req: CustomRequest, res: Response) => {
  res.status(StatusCodes.OK).json(
    await Job.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true, runValidators: true }
    )
  );
};

const remove = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;

  const job = await Job.findByIdAndRemove(id);
  handleItemNotFound(job, "job", id);

  res.status(StatusCodes.OK).json(job);
};

export default { findAll, findOne, remove, patch, create };
