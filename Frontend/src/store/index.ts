import { configureStore } from "@reduxjs/toolkit";
import { combineReducer } from "@store/combineReducer";

const store = configureStore({
    reducer: combineReducer
})

export default store;

export type AppDispatch = typeof store.dispatch