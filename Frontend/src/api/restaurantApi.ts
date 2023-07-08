import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "@utils/axios/axios";

const initialState = {
    isLoading: false
}

export const registerRestaurantHandler = createAsyncThunk("register-restaurant", async (payload, { rejectWithValue }) => {
    // console.log(payload);
    try {
        const response = await axiosInstance.post(`/register/restaurant/details`, payload);
        return response;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data ?? 'An error occured')
    }
})

const restaurantApiSlice = createSlice({
    name: "restaurant-api",
    initialState,
    reducers: {},
    extraReducers: {
        [registerRestaurantHandler.pending.type]: (state) => {
            state.isLoading = true
        },
        [registerRestaurantHandler.fulfilled.type]: (state) => {
            state.isLoading = false
        },
        [registerRestaurantHandler.rejected.type]: (state) => {
            state.isLoading = false
        }
    }
})

export default restaurantApiSlice.reducer;