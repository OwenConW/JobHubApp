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
    getAllReviews: (state, action) => {
      state.reviews = action.payload;
		},
    getAllOrders: (state, action) => {
      state.orders = action.payload;
		},
	},
});
 
export const { getAllUsers, getAllReviews, getAllOrders } = adminSlice.actions;
export default adminSlice.reducer;
