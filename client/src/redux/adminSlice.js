import { createSlice } from '@reduxjs/toolkit';

export const adminSlice = createSlice({
	name: 'admin',
	initialState: {
    users: [],
	},
	reducers: {
		getAllUsers: (state, action) => {
      state.users = action.payload;
		},
	},
});
 
export const { getAllUsers } = adminSlice.actions;
export default adminSlice.reducer;
