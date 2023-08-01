import { combineReducers } from "@reduxjs/toolkit";
import dishReducer from "@store/restaurant-register/dish.reducer";
import restaurantDetails from "@store/restaurant-register/restaurant-details";
import authReducer from "@store/auth/auth.reducer";
import restaurantApi from "../api/restaurantApi";
import userReducer from "./user/user.reducer";

export const combineReducer = combineReducers({
    auth: authReducer,
    dish: dishReducer,
    restaurantDetails: restaurantDetails,
    user: userReducer,
    //apis
    restaurantApi: restaurantApi
})