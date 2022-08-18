import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'users',
	initialState: {
		activeUser: {},
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
			state.detail = action.payload;
		},
		getFilteredProfessionals: (state, action) => {
			state.filteredProfessionals = action.payload;
		},
		setActiveUser: (state, action) => {
			state.activeUser = action.payload //Seteo el activeUser RIcoooooooooooo
		}
	},
});

export const { getAllUsers, getUserById, getFilteredProfessionals, setActiveUser } =
	userSlice.actions;
export default userSlice.reducer;
