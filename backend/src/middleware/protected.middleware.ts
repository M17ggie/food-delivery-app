import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ErrorResponse } from "../utils/errorResponse";
import { IToken } from "../utils/interfaces";
import cookie from 'cookie'
import { decodeJwtCookieToken } from "../utils/helpers";

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.headers.cookie;
  if (cookies) {
    const parsedCookies = cookie.parse(cookies);
    const token = parsedCookies.token;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as IToken;
      if (decoded && decoded.role === "642b083d0fe5426488d3b5c9") {
        req.userId = decoded.id!;
        next();
      } else {
        delete req.userId;
        return next(new ErrorResponse("Intruder", 401));
      }
    } catch (err) {
      delete req.userId;
      return next(new ErrorResponse("Intruder", 401));
    }
  } else {
    return next(new ErrorResponse("Intruder", 401));
  }
};

export const authenticatedOnly = (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.headers.cookie;
  if (cookies) {
    const { role, id } = decodeJwtCookieToken(cookies);
    if (role) {
      req.role = role;
      req.userId = id!;
      next();
    } else {
      return next(new ErrorResponse("Invalid token", 401))
    }
  } else {
    return next(new ErrorResponse("Invalid token", 401))
  }
}
