import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import speechReducer from "./speechSlice";
import alertReducer from "./alertSlice";

const rootReducer = combineReducers({
    user: userReducer,
    speech: speechReducer,
    alert: alertReducer,
});

export default rootReducer;
