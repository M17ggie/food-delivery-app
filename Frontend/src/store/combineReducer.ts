import { combineReducers } from "@reduxjs/toolkit";
import dishReducer from "@store/restaurant-register/dishReducer";

export const combineReducer = combineReducers({
    dish: dishReducer
})