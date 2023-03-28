import { NextFunction, Request, Response } from "express";
import { asyncHandler } from '../../middleware/async'
import { ErrorResponse } from "../../utils/errorResponse";
import User from '../../models/User'

//User authentication

export const loginUserHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { password, email } = req.body;

    //credentials should not be empty
    if (!email || !password) {
        return next(new ErrorResponse(`Email/Password hasn't been provided`, 400))
    }

    //check id user exists
    const user = await User.findOne({ email }).select(['password']);

    if (!user) {
        return next(new ErrorResponse('User does not exist. Please register to continue.', 400))
    }

    const isMatch = await user.matchedPasswords(password);
    if (!isMatch) {
        next(new ErrorResponse('Password entered is incorrect', 400))
    }

    //send token if all goes well
    const token = user.getSignedJWTToken();
    res.status(200).send({ token })
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