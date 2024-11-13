import type { Request, Response } from "express";
import config from "../config";

export const getRoot = (_req: Request, res: Response) => {
  res.status(200).json({
    name: config.name,
    version: config.version,
  });
};

export const postRoot = (req: Request, res: Response) => {
  const json = req.body;
  res.status(201).json({
    json,
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorRoot = (_req: Request, _res: Response) => {
  throw new Error("Simulated 500 error");
};

export const authRoot = (_req: Request, res: Response) => {
  res.status(200).json({
    message: "You are authenticated",
  });
};
