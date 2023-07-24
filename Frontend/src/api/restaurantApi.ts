import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "@utils/axios/axios";

const initialState = {
    isLoading: false,
    isDetailsSubmitted: false
}

export const registerRestaurantHandler = createAsyncThunk("register-restaurant", async (payload, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`/register/restaurant/details`, payload);
        return response;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data ?? 'An error occured')
    }
})

export const getRestaurantBasicDetail = createAsyncThunk("get-basic-restaurant-detail", async (payload, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(``)
    } catch (error: any) {
        return rejectWithValue(error?.response?.data ?? 'An error occured')
    }
})

const restaurantApiSlice = createSlice({
    name: "restaurant-api",
    initialState,
    reducers: {
        getBasicRestaurantDetail: (state, { payload }) => {
            state.isDetailsSubmitted = payload.data.isDetailsSubmitted;
        }
    },
    extraReducers: {
        [registerRestaurantHandler.pending.type]: (state) => {
            state.isLoading = true
        },
        [registerRestaurantHandler.fulfilled.type]: (state) => {
            state.isLoading = false
        },
        [registerRestaurantHandler.rejected.type]: (state) => {
            state.isLoading = false;
        }
    }
})

export const { getBasicRestaurantDetail } = restaurantApiSlice.actions
export default restaurantApiSlice.reducer;