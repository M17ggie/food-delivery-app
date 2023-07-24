import { NextFunction } from "express"
import { ErrorResponse } from "./errorResponse"
import cookie from "cookie"
import jwt from "jsonwebtoken"
import { IToken } from "./interfaces"

// validate credentials***************************
export const validateCredentials = (email: string, password: string, next: NextFunction) => {
    if (!email || !password) {
        return next(new ErrorResponse(`Email/Password hasn't been provided`, 400))
    }
}

//jwt decoder*****************************
export const decodeJwtCookieToken = (cookies: string) => {
    const parsedCookies = cookie.parse(cookies);
    const token = jwt.verify(parsedCookies.token, process.env.JWT_SECRET!) as IToken;
    return token
}