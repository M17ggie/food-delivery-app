import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILogin } from "@utils/interfaces/auth/auth.interface";
import { axiosInstance } from "../../utils/axios/axios";
import Cookies from "js-cookie";

const initialState = {
    isLoggedIn: false,
    isLoading: false
}

export const loginHandler = createAsyncThunk("login-handler", async (payload: { loginDetails: ILogin, userType: string }, { rejectWithValue }) => {
    const { loginDetails, userType } = payload;
    try {
        const response = await axiosInstance.post(`/auth/${userType}/login`, loginDetails);
        return response;
    } catch (err: any) {
        return rejectWithValue(err?.response?.data ?? 'An error occured')
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStateHandler: (state, { payload }) => {
            console.log(payload["headers"]);
            // Cookies.set();
            state.isLoggedIn = true
        },
        logoutHandler: (state) => {
            state.isLoggedIn = false
        }
    },
    extraReducers: {
        [loginHandler.pending.type]: (state) => {
            state.isLoading = true
        },
        [loginHandler.fulfilled.type]: (state) => {
            state.isLoggedIn = false
            state.isLoading = false
        },
        [loginHandler.rejected.type]: (state) => {
            state.isLoggedIn = false
            state.isLoading = false
        }
    }
})

export const { loginStateHandler, logoutHandler } = authSlice.actions
export default authSlice.reducer