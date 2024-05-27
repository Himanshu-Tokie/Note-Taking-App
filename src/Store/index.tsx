import { configureStore } from "@reduxjs/toolkit";
import image from './Image';
import common from "./Common";
import firebase from "./Firebase";
import theme from "./Theme";
export const store = configureStore({
    reducer:{
        common,
        firebase,
        theme,
        image
    },
    middleware: getDefaultMiddleware=>getDefaultMiddleware()
})