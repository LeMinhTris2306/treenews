import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../apis/userApi";

export const login = createAsyncThunk("user/login", async (loginData) => {
    console.log("in slice", loginData);
    const userId = await userApi.login(loginData);
    if (userId == null) {
        return false;
    } else {
        console.log("in slice userid", userId.token);
        return userId;
    }
});

export const getUser = createAsyncThunk("user/login", async (userId) => {
    const user = await userApi.getUser(userId);
    return user;
});

export const getUsers = createAsyncThunk("user/login", async (n) => {
    const users = await userApi.getUsers(n);
    return users;
});

export const updateUser = createAsyncThunk(
    "user/update",
    async ({ data, id }) => {
        const result = await userApi.updateUser(data, id);
        return result;
    }
);

export const changePassword = createAsyncThunk(
    "user/changePassword",
    async ({ passwords, id }) => {
        const result = await userApi.changePasswrod(passwords, id);
        return result;
    }
);

export const changeAvatar = createAsyncThunk(
    "user/changeAvatar",
    async ({ img, id }) => {
        const result = await userApi.changeAvatar(img, id);
        return result;
    }
);
