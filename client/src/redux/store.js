import { configureStore } from "@reduxjs/toolkit"
import users from "./userSlice.js"
import jobs from "./jobSlice.js"
import fetching from "./fetchingSlice.js"
import admin from "./adminSlice"

export default configureStore({
    reducer:{
        users: users,
        jobs: jobs,
        fetching: fetching,
        admin: admin
    }
})
