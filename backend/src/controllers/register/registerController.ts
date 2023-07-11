import { Request, Response } from "express";
import Restaurant from "../../models/Restaurant";

//register/update restaurant
export const registerRestaurantDetailsHandler = async (req: Request, res: Response) => {
    // console.log(req.cookies);
    // console.log(req.body);
    // console.log();
    // const { basicDetail, metaDetail, foodDetail } = req.body
    // find corresponding user
    // const registeredRestaurant = await Restaurant.findOne({ email }).select(['password'])
    // const restaurant = await Restaurant.create({
    //     basicDetail, metaDetail, foodDetail
    // });
    res.send('Registration process completed')
}