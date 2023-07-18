import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../middleware/async.middleware";

// export const checkSessionMiddleware = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//     if (req.session && req.session.user) {
//         next();
//     } else {
//         res.status(401).json({ message: "Something went wrong. Please login again to continue" })
//     }
// })