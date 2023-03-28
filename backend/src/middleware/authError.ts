import { Request, Response, NextFunction } from 'express'
import { ErrorResponse } from '../utils/errorResponse';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let error: any = { ...err }

    console.log(err.name, err.message)

    //non-enumerable property
    error.message = err.message;

    if (err.code === 11000) {
        error.message = 'Email already exists!';
        error.statusCode = 400
    }

    if (err.name === "ValidationError") {
        error = new ErrorResponse(`Email/Password should not be empty`, 400)
    }

    res.status(error.statusCode || 500).json({
        message: error.message || 'Server did an oopsie!'
    })
}

module.exports = errorHandler;