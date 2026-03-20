import {configureStore} from "@reduxjs/toolkit";
import uiReducer from "../features/ui/uiSlice";

export const store = configureStore({
    reducer: {
        // Add your reducers here
        ui: uiReducer,
    }
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
