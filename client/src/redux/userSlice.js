import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'users',
	initialState: {
		users: [],
		filteredProfessionals: [],
		detail: {},
	},
	reducers: {
		getAllUsers: (state, action) => {
			state.filteredProfessionals = action.payload;
			state.users = action.payload;
		},
		getUserById: (state, action) => {
			state.detail = action.payload
		},
		getFilteredProfessionals: (state, action) => {
			state.filteredProfessionals = action.payload;
		},
		clearDetails: (state) => {
			state.detail = {};
		}
	},
});

export const { getAllUsers, getUserById, getFilteredProfessionals, setActiveUser, clearDetails } =
	userSlice.actions;
export default userSlice.reducer;
