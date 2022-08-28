import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
	name: 'orders',
	initialState: {
		orders: [],
	},
	reducers: {
		getAllOrders: (state, action) => {
			state.orders = action.payload;
		},
	},
});

export const { getAllOrders } =
orderSlice.actions;
export default orderSlice.reducer;