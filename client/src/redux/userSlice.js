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
		getUsersByNameOrJob: (state, action) => {
			state.users = action.payload;
		},
	},
});

export const { getAllUsers, getUserById, getUsersByNameOrJob } =
	userSlice.actions;
export default userSlice.reducer;
