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
		//Edit
		fetchingAdminEditReview: false,
		fetchingAdminEditReviewFailure: false,
		fetchingAdminEditReviewSuccess: false,

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
			state.fetchingAdminDeleteReview = true
		},
		fetchingAdminDeleteReviewSuccess: (state, action) => {
			state.fetchingAdminDeleteReview = false
			state.fetchingAdminDeleteReviewSuccess = true
		},
		fetchingAdminDeleteReviewFailure: (state, action) => {
			state.fetchingAdminDeleteReview = false
			state.fetchingAdminDeleteReviewFailure = true
		},
		fetchingAdminDeleteReviewReset: (state, action) => {
			state.fetchingAdminDeleteReview = false
			state.fetchingAdminDeleteReviewFailure = false
			state.fetchingAdminDeleteReviewSuccess = false
		},

		//EditHandling
		fetchingAdminEditReview: (state, action) => {
			state.fetchingAdminEditReview = true
		},
		fetchingAdminEditReviewSuccess: (state, action) => {
			state.fetchingAdminEditRevieww = false
			state.fetchingAdminEditReviewSuccess = true
		},
		fetchingAdminEditReviewFailure: (state, action) => {
			state.fetchingAdminEditReview = false
			state.fetchingAdminEditReviewFailure = true
		},
		fetchingAdminEditReviewReset: (state, action) => {
			state.fetchingAdminEditReview = false
			state.fetchingAdminEditReviewFailure = false
			state.fetchingAdminEditReviewSuccess = false
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
							 fetchingAdminDeleteReviewReset,
							 fetchingAdminEditReview,
							 fetchingAdminEditReviewSuccess,
							 fetchingAdminEditReviewFailure,
							 fetchingAdminEditReviewReset
							} = fetchingSlice.actions;
export default fetchingSlice.reducer;
