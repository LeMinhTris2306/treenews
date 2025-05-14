import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    token: localStorage.getItem("user") || "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("user");
            state.currentUser = null;
        },
        setUser: (state, action) => {
            state.currentUser = action.payload;
        },
    },
});

export const { logout, setUser } = userSlice.actions; // Export both action creators here

export const selectToken = (state) => state.user.token;
export const selectCurrentUser = (state) => state.user.currentUser;

export default userSlice.reducer;
