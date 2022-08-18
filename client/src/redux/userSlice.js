import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'users',
	initialState: {
		users: [],
		detail: {},
	},
	reducers: {
		getAllUsers: (state, action) => {
			state.users = action.payload;
		},
		getUserById: (state, action) => {
			state.detail = action.payload;
		},
		actionGetUsersByNameOrJob: (state, action) => {
			state.users = action.payload;
			console.log("array users",state.users)
		},
	},
});

export const { getAllUsers, getUserById, actionGetUsersByNameOrJob } =
	userSlice.actions;
export default userSlice.reducer;
