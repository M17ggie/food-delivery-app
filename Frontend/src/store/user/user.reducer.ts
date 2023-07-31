import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "@utils/axios/axios";

const initialState = {
    name: "",
    email: "",
    isDetailsSubmitted: false,
    status: "pending"
}

export const getUserInfoHandler = createAsyncThunk("get-user-info", async (payload: { userType: string }, { rejectWithValue }) => {
    const { userType } = payload;
    try {
        const response = await axiosInstance.get(`/auth/${userType}/get-user`);
        return response.data
    } catch (err: any) {
        return rejectWithValue(err?.response?.data ?? 'An error occured')
    }
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUserInfo: (state, { payload }) => {
            state.email = payload.email;
            state.name = payload.name.split(" ")[0];
            state.isDetailsSubmitted = payload.isDetailsSubmitted;
            state.status = payload.status;
        }
    }
})

export const { getUserInfo } = userSlice.actions;
export default userSlice.reducer;