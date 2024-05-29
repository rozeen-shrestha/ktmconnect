import userSlice from "../reducerSlices/userSlice"

import { configureStore, Tuple } from '@reduxjs/toolkit'
import logger from "redux-logger";

const store = configureStore({
    reducer:{
        user: userSlice
    },
    middleware: () => new Tuple(logger),
})

export default store