import { NextFunction, Request, Response } from "express";
import { asyncHandler } from '../../middleware/async'
import { ErrorResponse } from "../../utils/errorResponse";
import User, { IUser } from '../../models/User';
import Restaurant, { IRestaurant } from "../../models/Restaurant";

// validate credentials***************************
const validateCredentials = (email: string, password: string, next: NextFunction) => {
    if (!email || !password) {
        return next(new ErrorResponse(`Email/Password hasn't been provided`, 400))
    }
}

// register user**************************
const registerUser = async (userModel: any, email: string, password: string, name: string) => {
    const user = await userModel.create({
        name,
        email,
        password
    });

    const { token, options } = sendTokenResponse(user);
    return { token, options }
}

//User authentication****************************

export const userLoginHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { password, email } = req.body;

    //credentials should not be empty
    validateCredentials(email, password, next)

    //check if user exists
    const user = await User.findOne({ email }).select(['password']);

    if (!user) {
        return next(new ErrorResponse('User does not exist. Please register to continue.', 404))
    }

    const isMatch = await user.matchedPasswords(password);
    if (!isMatch) {
        next(new ErrorResponse('Password entered is incorrect', 400))
    }

    //send token if all goes well
    const { token, options } = sendTokenResponse(user);

    res.cookie('token', token, options).send('Logged In')
})

export const userRegisterHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name, password, email } = req.body;

    const { token, options } = await registerUser(User, email, password, name);
    res.cookie('token', token, options).send('Registered')
});

// Restaurant authentication**************************

export const restaurantLoginHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    validateCredentials(email, password, next);

    const restaurantUser = await Restaurant.findOne({ email }).select(["password"]);

    if (!restaurantUser) {
        return next(new ErrorResponse(`User does not exist. Please register to continue.`, 404))
    }

    const { token, options } = sendTokenResponse(restaurantUser)

    res.cookie('token', token, options).send('Logged In!')
})

export const restaurantRegisterHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name } = req.body;

    const { token, options } = await registerUser(Restaurant, email, password, name);

    await registerUser(User, email, password, name);
    res.cookie('token', token, options).send('Registered Restaurant')
})


// cookie maker***********
const sendTokenResponse = (user: IUser | IRestaurant) => {
    const token = user.getSignedJWTToken();
    const options = {
        httpOnly: true
    }
    return { token, options };
}