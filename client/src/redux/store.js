import { configureStore } from "@reduxjs/toolkit"
import users from "./userSlice.js"


export default configureStore({
    reducer:{
        users: users,
    }
})
