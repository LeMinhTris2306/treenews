import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    alertMessage: {
        message: "",
        type: "",
    },
};

export const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        setAlert: (state, action) => {
            state.alertMessage = action.payload;
        },
        clearAlert: (state) => {
            state.alertMessage = {
                message: "",
                type: "",
            };
        },
    },
});

export const getAlertMessage = (state) => state.alert.alertMessage;

export const { setAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;
