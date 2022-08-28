import { createSlice } from '@reduxjs/toolkit';

export const reviewSlice = createSlice({
	name: 'reviews',
	initialState: {
	reviews: [],
	},
	reducers: {
		getAllReviews: (state, action) => {
			state.reviews = action.payload;
		},
	},
});

export const { getAllReviews } =
	reviewSlice.actions;
export default reviewSlice.reducer;