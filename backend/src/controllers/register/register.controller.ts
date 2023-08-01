import { NextFunction, Request, Response } from "express";
import Restaurant from "../../models/Restaurant.model";
import { decodeJwtCookieToken } from "../../utils/helpers";
import { asyncHandler } from "../../middleware/async.middleware";
import { ErrorResponse } from "../../utils/errorResponse";

//register/update restaurant
export const registerRestaurantDetailsHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.headers.cookie;
    if (cookies) {
        const { id: restaurantId } = decodeJwtCookieToken(cookies);
        const restaurant = await Restaurant.findById({ _id: restaurantId });
        if (!restaurant) {
            return next(new ErrorResponse("No restaurant found", 404))
        }
        restaurant.metaDetail = req.body.metaDetail;
        restaurant.basicDetail = req.body.basicDetail;
        restaurant.menuCard = req.body.foodDetail.menuCard;
        restaurant.foodDetail = req.body.foodDetail.foodDishes;
        restaurant.isDetailsSubmitted = true;
        await restaurant.save()
        return res.send({ status: "success", message: "Restaurant registered successfully" })
    } else {
        return next(new ErrorResponse("Invalid token", 401))
    }
})