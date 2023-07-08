import { combineReducers } from "@reduxjs/toolkit";
import dishReducer from "@store/restaurant-register/dishReducer";
import restaurantDetails from "@store/restaurant-register/restaurant-details";
import authReducer from "@store/auth/authReducer";
import restaurantApi from "../api/restaurantApi";

export const combineReducer = combineReducers({
    auth: authReducer,
    dish: dishReducer,
    restaurantDetails: restaurantDetails,
    //apis
    restaurantApi: restaurantApi
})