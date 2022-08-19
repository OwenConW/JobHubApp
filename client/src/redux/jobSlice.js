import { createSlice } from '@reduxjs/toolkit';

export const jobSlice = createSlice({
	name: 'jobs',
	initialState: {
    jobs: [],
	},
	reducers: {
		getAllJobs: (state, action) => {
			state.jobs = action.payload;
		},
	},
});

export const { getAllUsers } =
jobSlice.actions;
export default jobSlice.reducer;
