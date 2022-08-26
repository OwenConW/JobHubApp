import { createSlice } from '@reduxjs/toolkit';

export const fetchingSlice = createSlice({
	name: 'fetching',
	initialState: {
		//states for mercadopago
		fetchingMercadoPagoLink: false,
		fetchingMercadoPagoLinkFailure: false,
		mercadopagoRedirectLink: '',

		//states for Admin
		// ============ Users ================
		//Delete
		fetchingAdminDeleteUser: false,
		fetchingAdminDeleteUserFailure: false,
		fetchingAdminDeleteUserSuccess: false,
		//Edit
		fetchingAdminEditUser: false,
		fetchingAdminEditUserFailure: false,
		fetchingAdminEditUserSuccess: false,

		// ============ Users ================
		//Delete
		fetchingAdminDeleteReview: false,
		fetchingAdminDeleteReviewSuccess: false,
		fetchingAdminDeleteReviewFailure: false,
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
		},

		//Reducers for Admin

		// =============== Users ===========================
		//DeleteHandling
		fetchingAdminDeleteUser: (state, action) => {
			state.fetchingAdminDeleteUser = true
		},
		fetchingAdminDeleteUserSuccess: (state, action) => {
			state.fetchingAdminDeleteUser = false
			state.fetchingAdminDeleteUserSuccess = true
		},
		fetchingAdminDeleteUserFailure: (state, action) => {
			state.fetchingAdminDeleteUser = false
			state.fetchingAdminDeleteUserFailure = true
		},
		fetchingAdminDeleteUserReset: (state, action) => {
			state.fetchingAdminDeleteUser = false
			state.fetchingAdminDeleteUserFailure = false
			state.fetchingAdminDeleteUserSuccess = false
		},

		//EditHandling
		fetchingAdminEditUser: (state, action) => {
			state.fetchingAdminDeleteUser = true
		},
		fetchingAdminEditUserSuccess: (state, action) => {
			state.fetchingAdminDeleteUser = false
			state.fetchingAdminDeleteUserSuccess = true
		},
		fetchingAdminEditUserFailure: (state, action) => {
			state.fetchingAdminDeleteUser = false
			state.fetchingAdminDeleteUserFailure = true
		},
		fetchingAdminEditUserReset: (state, action) => {
			state.fetchingAdminDeleteUser = false
			state.fetchingAdminDeleteUserFailure = false
			state.fetchingAdminDeleteUserSuccess = false
		},

		// =============== Review ===========================

		//DeleteHandling
		fetchingAdminDeleteReview: (state, action) => {
			state.fetchingAdminDeleteUser = true
		},
		fetchingAdminDeleteReviewSuccess: (state, action) => {
			state.fetchingAdminDeleteUser = false
			state.fetchingAdminDeleteUserSuccess = true
		},
		fetchingAdminDeleteReviewFailure: (state, action) => {
			state.fetchingAdminDeleteUser = false
			state.fetchingAdminDeleteUserFailure = true
		},
		fetchingAdminDeleteReviewReset: (state, action) => {
			state.fetchingAdminDeleteUser = false
			state.fetchingAdminDeleteUserFailure = false
			state.fetchingAdminDeleteUserSuccess = false
		},
	},
});

export const { fetchingMercadopagoLink, 
							 fetchingMercadopagoLinkSuccess, 
							 fetchingMercadopagoLinkFailure,
							 clearMercadopagoRedirectLink,
							 setFetchingMercadoPagoLinkFalse,
							 fetchingAdminDeleteUser,
							 fetchingAdminDeleteUserSuccess,
							 fetchingAdminDeleteUserFailure,
							 fetchingAdminDeleteUserReset,
							 fetchingAdminEditUser,
							 fetchingAdminEditUserSuccess,
							 fetchingAdminEditUserFailure,
							 fetchingAdminEditUserReset,
							 fetchingAdminDeleteReview,
							 fetchingAdminDeleteReviewSuccess,
							 fetchingAdminDeleteReviewFailure,
							 fetchingAdminDeleteReviewReset
							} = fetchingSlice.actions;
export default fetchingSlice.reducer;
