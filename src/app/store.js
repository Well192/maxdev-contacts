import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import contactsReducer from "../features/contact/contactSlice"
export const store = configureStore({
    reducer: {
        auth: authReducer,
        contacts: contactsReducer
    }
})