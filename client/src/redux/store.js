import { configureStore } from "@reduxjs/toolkit"
import users from "./userSlice.js"
import jobs from "./jobSlice.js"
import fetching from "./fetchingSlice.js"
import reviews from './reviewSlice.js'
import orders from './orderSlice.js'
export default configureStore({
    reducer:{
        users: users,
        jobs: jobs,
        fetching: fetching,
        reviews: reviews,
        orders: orders,
    }
})
