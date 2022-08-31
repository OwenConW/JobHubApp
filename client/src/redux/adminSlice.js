import { createSlice } from '@reduxjs/toolkit';

export const adminSlice = createSlice({
	name: 'admin',
	initialState: {
    users: [],
    reviews: [],
    orders: []
	},
	reducers: {
    // USERS
		getAllUsers: (state, action) => {
      state.users = action.payload;
		},
    getUserById: (state, action) => {
      state.users = [action.payload];
    },
    // REVIEWS
    getAllReviews: (state, action) => {
      state.reviews = action.payload;
		},
    getReviewById: (state, action) => {
      state.reviews = action.payload;
    },
    getReviewByUserProfessionalId: (state, action) => {
      state.reviews = action.payload.reviews;
    },
    // ORDERS
    getAllOrders: (state, action) => {
      state.orders = action.payload;
		},
    getOrdersById: (state, action) => {
      state.orders = action.payload
    }
	},
});
 
export const { getAllUsers,
               getAllReviews, 
               getReviewByUserProfessionalId, 
               getReviewById, 
               getAllOrders, 
               getUserById, 
               getOrdersById } = adminSlice.actions;
export default adminSlice.reducer;
