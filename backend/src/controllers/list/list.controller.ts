import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../middleware/async.middleware";
import Restaurant from "../../models/Restaurant.model";

export const getListHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { status, userType } = req.query;
    let result;
    switch (userType) {
        case "restaurant": result = await Restaurant.aggregate([
            { $match: { status } },
            {
                $project: {
                    restaurantName: "$basicDetail.restaurantName",
                    restaurantEmail: "$basicDetail.restaurantEmail",
                    restaurantPhoneNumber: "$basicDetail.restaurantPhoneNumber",
                }
            }
        ]);
            break;
        // case "delivery": const delivery = await Restaurant.find({ status });
        //     return res.send(delivery);
        default: return res.status(400).send("Invalid Request")
    }
    return res.send(result)
});

export const getRestaurantExecutiveDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { userType } = req.params;
    const { id } = req.query;
    console.log({ userType, id })
    let query;
    switch (userType) {
        case "restaurant": query = await Restaurant.findById(id); break;
        // case "delivery": const delivery = await 
        default: return res.status(400).send("Invalid Request")
    }
    return res.send(query)
})