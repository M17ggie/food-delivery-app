import { NextFunction, Request, Response } from "express";
import { asyncHandler } from '../../middleware/async'
const ErrorResponse = require('../../utils/errorResponse');
import User from '../../models/User'

//User authentication
export const loginUserHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name, password, email, role } = req.body;

    const user = await User.create({
        name,
        password,
        email,
        role
    })

    res.send('Hi')
})

export const registerUserHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name, password, email, role } = req.body;

    const user = await User.create({
        name,
        password,
        email,
        role
    })

    res.send('Registration successfull')
})