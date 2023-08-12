import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../middleware/async.middleware";
import Restaurant from "../../models/Restaurant.model";

export const statusHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { status, id } = req.body;
    const { userType } = req.params;
    console.log({ status, id, userType })
    let query;
    switch (userType) {
        case 'restaurant': query = await Restaurant.findById(id); break;
        // case 'restaurant': query = await Restaurant.findById(id); break;
        default: return res.status(400).send("Invalid Request")
    }
    if (query) {
        query.status = status;
        await query.save();
        res.send("Status Changed")
    } else {
        res.status(404).send("Resource not found")
    }
})