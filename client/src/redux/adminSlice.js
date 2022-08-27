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
      state.users = [action.payload]
    },
    getAllReviews: (state, action) => {
      state.reviews = action.payload;
		},
    getAllOrders: (state, action) => {
      state.orders = action.payload;
		},
	},
});
 
export const { getAllUsers, getAllReviews, getAllOrders, getUserById } = adminSlice.actions;
export default adminSlice.reducer;
