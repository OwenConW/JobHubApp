import { configureStore } from "@reduxjs/toolkit"
import users from "./userSlice.js"
import jobs from "./jobSlice.js"


export default configureStore({
    reducer:{
        users: users,
        jobs: jobs
    }
})
