import { createSlice } from '@reduxjs/toolkit';

export const fetchingSlice = createSlice({
	name: 'fetching',
	initialState: {
		fetchingMercadoPagoLink: false,
		fetchingMercadoPagoLinkFailure: false,
		mercadopagoRedirectLink: ''
	},
	reducers: {
		fetchingMercadopagoLink: (state, action) => {
			state.fetchingMercadoPagoLink = true
		},
		fetchingMercadopagoLinkSuccess: (state, action) => {
			state.mercadopagoRedirectLink = action.payload
		},
		fetchingMercadopagoLinkFailure: (state, action) => {
			state.fetchingMercadoPagoLink = false
			state.fetchingMercadoPagoLinkFailure = true
		},
		clearMercadopagoRedirectLink: (state, action) => {
			state.mercadopagoRedirectLink = ''
			state.fetchingMercadoPagoLinkFailure = false
		},
		setFetchingMercadoPagoLinkFalse: (state, action) => {
			state.fetchingMercadoPagoLink = false
		}
	},
});

export const { fetchingMercadopagoLink, 
							 fetchingMercadopagoLinkSuccess, 
							 fetchingMercadopagoLinkFailure,
							 clearMercadopagoRedirectLink,
							 setFetchingMercadoPagoLinkFalse } = fetchingSlice.actions;
export default fetchingSlice.reducer;
