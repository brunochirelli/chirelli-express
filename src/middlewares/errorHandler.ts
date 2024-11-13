import type { NextFunction, Request, Response } from "express";
import config from "../config";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  console.error(err);
  res.status(500).json({
    message: config.nodeEnv === "production" ? "unknown error" : `${err}`,
  });
};

export default errorHandler;
