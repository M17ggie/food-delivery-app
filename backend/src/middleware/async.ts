import { Request, Response, NextFunction } from "express"

export const asyncHandler: Function = (fn: any) => async (err: any, req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}