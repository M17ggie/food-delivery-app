import { NextFunction, Request, Response } from "express";
import { asyncHandler } from '../../middleware/async'
import { ErrorResponse } from "../../utils/errorResponse";
import User, { IUser } from '../../models/User';

//User authentication****************************

export const userLoginHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { password, email } = req.body;

    //credentials should not be empty
    if (!email || !password) {
        return next(new ErrorResponse(`Email/Password hasn't been provided`, 400))
    }

    //check if user exists
    const user = await User.findOne({ email }).select(['password']);

    if (!user) {
        return next(new ErrorResponse('User does not exist. Please register to continue.', 400))
    }

    const isMatch = await user.matchedPasswords(password);
    if (!isMatch) {
        next(new ErrorResponse('Password entered is incorrect', 400))
    }

    //send token if all goes well
    sendTokenResponse(user, 200, res);
})

export const userRegisterHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name, password, email, role } = req.body;

    const user = await User.create({
        name,
        password,
        email,
        role
    })

    //send cookie
    sendTokenResponse(user, 200, res);
});

// cookie maker***********
const sendTokenResponse = (user: IUser, statusCode: number, res: Response) => {
    const token = user.getSignedJWTToken();
    const options = {
        httpOnly: true
    }
    res.status(statusCode).cookie('token', token, options).send()
}

// Restaurant authentication**************************

export const restaurantLoginHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('Restaurant login!')
})

export const restaurantRegisterHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('Restaurant registered!')
})