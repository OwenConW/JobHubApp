import { configureStore } from "@reduxjs/toolkit"
import users from "./userSlice.js"
import jobs from "./jobSlice.js"
import fetching from "./fetchingSlice.js"
import admin from "./adminSlice"
import reviews from './reviewSlice.js'
import orders from './orderSlice.js'

export default configureStore({
    reducer:{
        users: users,
        jobs: jobs,
        fetching: fetching,
        admin: admin,
        reviews: reviews,
        orders: orders,
    }
})
