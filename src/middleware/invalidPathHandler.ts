import { Request, Response } from "express";

export const invalidPathHandler = (req: Request, res: Response) => {
  res.status(404).send({ error: "unknown enpoint" });
};
