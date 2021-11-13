import { Response } from "express";

export const validateNumber = (num: any) => parseFloat(num) > 0;

export const ok = (res: Response) => res.sendStatus(200);