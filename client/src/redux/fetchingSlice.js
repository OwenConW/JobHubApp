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
		//Fetch
		fetchingUsers: false,
		fetchingUsersFailure: false, 
		fetchingUsersSuccess: false, 

		//Delete
		fetchingAdminDeleteUser: false,
		fetchingAdminDeleteUserFailure: false, 
		fetchingAdminDeleteUserSuccess: false, 
		//Edit
		fetchingAdminEditUser: false,
		fetchingAdminEditUserFailure: false,
		fetchingAdminEditUserSuccess: false,

		//restore
		fetchingAdminRestoreUser: false,
		fetchingAdminRestoreUserFailure: false,
		fetchingAdminRestoreUserSuccess: false,
	
		// ============ Reviews ================
		//Delete
		fetchingAdminDeleteReview: false,
		fetchingAdminDeleteReviewSuccess: false,
		fetchingAdminDeleteReviewFailure: false,
		//Edit
		fetchingAdminEditReview: false,
		fetchingAdminEditReviewFailure: false,
		fetchingAdminEditReviewSuccess: false,

		// ============ ORDERS ================
		//Delete
		fetchingAdminDeleteOrder: false,
		fetchingAdminDeleteOrderSuccess: false,
		fetchingAdminDeleteOrderFailure: false,
		//Edit
		fetchingAdminEditOrder: false,
		fetchingAdminEditOrderFailure: false,
		fetchingAdminEditOrderSuccess: false,

		// ============ Claims ================
		//Delete
		fetchingAdminDeleteClaim: false,
		fetchingAdminDeleteClaimSuccess: false,
		fetchingAdminDeleteClaimFailure: false,
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
		//Fetch Handling
		fetchingUsers: (state, action) => {
			state.fetchingUsers = true
		},
		fetchingUsersSuccess: (state, action) => {
			state.fetchingUsers = false
			state.fetchingUsersSuccess = true
		},
		fetchingUsersFailure: (state, action) => {
			state.fetchingUsers = false
			state.fetchingUsersFailure = true
		},
		fetchingUsersReset: (state, action) => {
			state.fetchingUsers = false
			state.fetchingUsersFailure = false
			state.fetchingUsersSuccess = false
		},

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
			state.fetchingAdminEditUser = true
		},
		fetchingAdminEditUserSuccess: (state, action) => {
			state.fetchingAdminEditUser = false
			state.fetchingAdminEditUserSuccess = true
		},
		fetchingAdminEditUserFailure: (state, action) => {
			state.fetchingAdminEditUser = false
			state.fetchingAdminEditUserFailure = true
		},
		fetchingAdminEditUserReset: (state, action) => {
			state.fetchingAdminEditUser = false
			state.fetchingAdminEditUserFailure = false
			state.fetchingAdminEditUserSuccess = false
		},

		//RestoreHandling
		fetchingAdminRestoreUser: (state, action) => {
			state.fetchingAdminRestoreUser = true
		},
		fetchingAdminRestoreUserSuccess: (state, action) => {
			state.fetchingAdminRestoreUser = false
			state.fetchingAdminRestoreUserSuccess = true
		},
		fetchingAdminRestoreUserFailure: (state, action) => {
			state.fetchingAdminRestoreUser = false
			state.fetchingAdminRestoreUserFailure = true
		},
		fetchingAdminRestoreUserReset: (state, action) => {
			state.fetchingAdminRestoreUser = false
			state.fetchingAdminRestoreUserFailure = false
			state.fetchingAdminRestoreUserSuccess = false
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
			state.fetchingAdminEditReview = false
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

		// =============== Orders ===========================

		//DeleteHandling
		fetchingAdminDeleteOrder: (state, action) => {
			state.fetchingAdminDeleteOrder = true
		},
		fetchingAdminDeleteOrderSuccess: (state, action) => {
			state.fetchingAdminDeleteOrder = false
			state.fetchingAdminDeleteOrderSuccess = true
		},
		fetchingAdminDeleteOrderFailure: (state, action) => {
			state.fetchingAdminDeleteOrder = false
			state.fetchingAdminDeleteOrderFailure = true
		},
		fetchingAdminDeleteOrderReset: (state, action) => {
			state.fetchingAdminDeleteOrder = false
			state.fetchingAdminDeleteOrderFailure = false
			state.fetchingAdminDeleteOrderSuccess = false
		},

		//EditHandling
		fetchingAdminEditOrder: (state, action) => {
			state.fetchingAdminEditOrder = true
		},
		fetchingAdminEditOrderSuccess: (state, action) => {
			state.fetchingAdminEditOrder = false
			state.fetchingAdminEditOrderSuccess = true
		},
		fetchingAdminEditOrderFailure: (state, action) => {
			state.fetchingAdminEditOrder = false
			state.fetchingAdminEditOrderFailure = true
		},
		fetchingAdminEditOrderReset: (state, action) => {
			state.fetchingAdminEditOrder = false
			state.fetchingAdminEditOrderFailure = false
			state.fetchingAdminEditOrderSuccess = false
		},

		// =============== Professions ===========================

		//CreationHandling
		fetchingAdminCreateProfession: (state, action) => {
			state.fetchingAdminCreateProfession = true
		},
		fetchingAdminCreateProfessionSuccess: (state, action) => {
			state.fetchingAdminCreateProfession = false
			state.fetchingAdminCreateProfessionSuccess = true
		},
		fetchingAdminCreateProfessionFailure: (state, action) => {
			state.fetchingAdminCreateProfession = false
			state.fetchingAdminCreateProfessionFailure = true
		},
		fetchingAdminCreateProfessionReset: (state, action) => {
			state.fetchingAdminCreateProfession = false
			state.fetchingAdminCreateProfessionFailure = false
			state.fetchingAdminCreateProfessionSuccess = false
		},

		//DeleteHandling
		fetchingAdminDeleteProfession: (state, action) => {
			state.fetchingAdminDeleteProfession = true
		},
		fetchingAdminDeleteProfessionSuccess: (state, action) => {
			state.fetchingAdminDeleteProfession = false
			state.fetchingAdminDeleteProfessionSuccess = true
		},
		fetchingAdminDeleteProfessionFailure: (state, action) => {
			state.fetchingAdminDeleteProfession = false
			state.fetchingAdminDeleteProfessionFailure = true
		},
		fetchingAdminDeleteProfessionReset: (state, action) => {
			state.fetchingAdminDeleteProfession = false
			state.fetchingAdminDeleteProfessionFailure = false
			state.fetchingAdminDeleteProfessionSuccess = false
		},

		// =============== Claims ===========================
		//DeleteHandling
		fetchingAdminDeleteClaim: (state, action) => {
			state.fetchingAdminDeleteClaim = true
		},
		fetchingAdminDeleteClaimSuccess: (state, action) => {
			state.fetchingAdminDeleteClaim = false
			state.fetchingAdminDeleteClaimSuccess = true
		},
		fetchingAdminDeleteClaimFailure: (state, action) => {
			state.fetchingAdminDeleteClaim = false
			state.fetchingAdminDeleteClaimFailure = true
		},
		fetchingAdminDeleteClaimReset: (state, action) => {
			state.fetchingAdminDeleteClaim = false
			state.fetchingAdminDeleteClaimFailure = false
			state.fetchingAdminDeleteClaimSuccess = false
		},
	},
});

export const { 
							 fetchingUsers,
							 fetchingUsersFailure,
							 fetchingUsersSuccess,
							 fetchingUsersReset,
							 fetchingMercadopagoLink, 
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
							 fetchingAdminEditReviewReset,
							 fetchingAdminDeleteOrder,
							 fetchingAdminDeleteOrderSuccess,
							 fetchingAdminDeleteOrderFailure,
							 fetchingAdminDeleteOrderReset,
							 fetchingAdminEditOrder,
							 fetchingAdminEditOrderSuccess,
							 fetchingAdminEditOrderFailure,
							 fetchingAdminEditOrderReset,
							 fetchingAdminRestoreUser,
							 fetchingAdminRestoreUserSuccess,
							 fetchingAdminRestoreUserFailure,
							 fetchingAdminRestoreUserReset,
							 fetchingAdminCreateProfession,
							 fetchingAdminCreateProfessionSuccess,
							 fetchingAdminCreateProfessionFailure,
							 fetchingAdminCreateProfessionReset,
							 fetchingAdminDeleteProfession,
							 fetchingAdminDeleteProfessionSuccess,
							 fetchingAdminDeleteProfessionFailure,
							 fetchingAdminDeleteProfessionReset,
							 fetchingAdminDeleteClaim,
							 fetchingAdminDeleteClaimSuccess,
							 fetchingAdminDeleteClaimFailure,
							 fetchingAdminDeleteClaimReset
							} = fetchingSlice.actions;
export default fetchingSlice.reducer;
