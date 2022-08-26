import { createSlice } from '@reduxjs/toolkit';

export const adminSlice = createSlice({
	name: 'admin',
	initialState: {
    users: [],
    reviews: []
	},
	reducers: {
		getAllUsers: (state, action) => {
      state.users = action.payload;
		},
    getAllReviews: (state, action) => {
      state.reviews = action.payload;
		},
	},
});
 
export const { getAllUsers,getAllReviews } = adminSlice.actions;
export default adminSlice.reducer;
