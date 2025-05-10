import { createSlice } from "@reduxjs/toolkit";

initState = {
    currentUser: null,
    token: localStorage.getItem("user") || "",
};

export const userSlice = createSlice({
    name: "user",
    initState,
    reducer: {
        logout: (state) => {
            localStorage.removeItem("user");
            state.currentUser = null;
        },
        setUser: (state, action) => {
            state.currentUser = action.payload;
        },
    },
});

export const { logout } = userSlice.actions;

export const selectToken = (state) => state.user.token;
export const selectCurrentUser = (state) => state.user.currentUser;

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
