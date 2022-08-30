import { createSlice } from '@reduxjs/toolkit';

export const adminSlice = createSlice({
	name: 'admin',
	initialState: {
    users: [],
    reviews: [],
    orders: []
	},
	reducers: {
		getAllUsers: (state, action) => {
      state.users = action.payload;
		},
    getUserById: (state, action) => {
      state.users = [action.payload];
    },
    getAllReviews: (state, action) => {
      state.reviews = action.payload;
		},
    getReviewByUserId: (state, action) => {
      if (!action.payload) return state.reviews = [];
      state.reviews = action.payload.reviews;
    },
    getAllOrders: (state, action) => {
      state.orders = action.payload;
		},
	},
});
 
export const { getAllUsers, getAllReviews, getReviewByUserId, getAllOrders, getUserById } = adminSlice.actions;
export default adminSlice.reducer;
