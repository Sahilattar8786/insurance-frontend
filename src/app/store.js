import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slice/userSlice";




export const store = configureStore({
    reducer:{
        // Define your reducers here
        userData:userSlice
    }
})