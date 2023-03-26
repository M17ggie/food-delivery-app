import { Request, Response, NextFunction } from 'express'

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let error: any = { ...err }
    console.log(err)
    if (err.code === 11000) {
        error.message = 'Email already exists!';
        error.statusCode = 400
    }

    res.status(error.statusCode || 500).json({
        message: error.message || 'Server did an oopsie!'
    })
}

module.exports = errorHandler;