import { StatusCodes } from "http-status-codes";

export class CustomError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
  }
}

export const handleItemNotFound = (item: unknown, name: string, id: string) => {
  if (!item)
    throw new CustomError(
      `Can't find a ${name.toLowerCase().trim()} with id: ${id}`,
      StatusCodes.NOT_FOUND
    );
};
