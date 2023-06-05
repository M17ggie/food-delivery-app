import { combineReducers } from "@reduxjs/toolkit";
import dishReducer from "@store/restaurant-register/dishReducer";
import restaurantDetails from "@store/restaurant-register/restaurant-details";

export const combineReducer = combineReducers({
    dish: dishReducer,
    restaurantDetails: restaurantDetails
})