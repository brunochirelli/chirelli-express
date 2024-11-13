import type { Request, Response } from "express";

const fourOhFour = (_req: Request, res: Response) => {
  res.status(404).json({ message: "not found" });
};

export default fourOhFour;
