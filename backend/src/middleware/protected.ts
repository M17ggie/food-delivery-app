import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ErrorResponse } from "utils/errorResponse";

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (decoded && decoded === "642b083d0fe5426488d3b5c9") {
      next();
    } else {
      return next(new ErrorResponse("Intruder", 401));
    }
  } catch (err) {}
  return next(new ErrorResponse("Intruder", 401));
};
