import { NextFunction, Request, Response } from "express";
import { asyncHandler } from '../../middleware/async'
const ErrorResponse = require('../../utils/errorResponse');
import User from '../../models/User'

//User authentication

export const loginUserHandler = asyncHandler(async (err: any, req: Request, res: Response, next: NextFunction) => {
    const { password, email } = req.body;

    if (!email || !password) {
        return next(err)
    }
})

export const registerUserHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name, password, email, role } = req.body;

    const user = await User.create({
        name,
        password,
        email,
        role
    })

    const token = user.getSignedJWTToken();

    res.status(200).send({ token })
})