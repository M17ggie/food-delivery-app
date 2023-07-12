import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ErrorResponse } from "../utils/errorResponse";
import { IToken } from "../utils/interfaces";
import CustomRequest from "../types/express/index";

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as IToken;
    console.log("TOKEN SHIT", decoded);
    if (decoded && decoded.role === "642b083d0fe5426488d3b5c9") {
      req.role = decoded.role;
      // console.log("THE FUCK", req)
      next();
    } else {
      return next(new ErrorResponse("Intruder", 401));
    }
  } catch (err) {
    console.log("WTF", err);
    return next(new ErrorResponse("Intruder", 401));
  }
};
