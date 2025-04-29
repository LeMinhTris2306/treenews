import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import speechReducer from "./speechSlice";
const rootReducer = combineReducers({
    user: userReducer,
    speech: speechReducer,
});

export default rootReducer;
