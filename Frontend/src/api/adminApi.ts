import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "@utils/axios/axios";

const initialState = {};

export const getTableList = createAsyncThunk("get-list", async (payload: { userType: string, status: string }, { rejectWithValue }) => {
    const { userType, status } = payload
    try {
        // const response = await axiosInstance.get()
    } catch (error: any) {
        return rejectWithValue(error?.response?.data ?? 'An error occured')
    }
})

const adminApiSlice = createSlice({
    name: "admin-api",
    initialState,
    reducers: {}
})