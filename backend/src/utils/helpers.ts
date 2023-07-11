import { NextFunction } from "express"
import { ErrorResponse } from "./errorResponse"
import jwt from "jsonwebtoken"

// validate credentials***************************
export const validateCredentials = (email: string, password: string, next: NextFunction) => {
    if (!email || !password) {
        return next(new ErrorResponse(`Email/Password hasn't been provided`, 400))
    }
}

//jwt decoder*****************************
export const decodeJwtToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        return decoded;
    } catch (err) {
        return null
    }
}