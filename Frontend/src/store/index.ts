import { configureStore } from "@reduxjs/toolkit";
import unregisteredSlice from "@store/unregistered/unregisteredSlice";

const store = configureStore({
    reducer: {
        unregisteredRestaurant: unregisteredSlice.reducer
    }
})

export default store