import { createSlice } from "@reduxjs/toolkit"

interface unregisteredState {
    isDetailsSubmitted: boolean
}

const unregisteredState = {
    isDetailsSubmitted: false
}

const unregisteredSlice = createSlice({
    name: 'unregistered',
    initialState: unregisteredState,
    reducers: {
        setIsDetailsSubmitted: (state, { payload }) => {
            state.isDetailsSubmitted = payload
        }
    }
})

export const unregisteredActions = unregisteredSlice.actions;
export default unregisteredSlice