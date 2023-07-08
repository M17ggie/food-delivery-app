import { Request, Response } from "express";

//register restaurant
export const registerRestaurantDetailsHandler = async (req: Request, res: Response) => {
    console.log(req.cookies)
    console.log(req.body)
}