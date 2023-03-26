import { Request, Response, NextFunction } from 'express'

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    console.log(err.code,err.keyPattern)

    res.status(err.StatusCode || 500).json({
        success: false,
        message: err.message || 'Server did an oopsie!'
    })
}

module.exports = errorHandler;