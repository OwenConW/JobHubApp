import { createSlice } from '@reduxjs/toolkit';

export const adminSlice = createSlice({
	name: 'admin',
	initialState: {
    users: [],
    reviews: [],
    orders: [],
    claims: []
	},
	reducers: {
    // USERS
		getAllUsers: (state, action) => {
      state.users = action.payload;
		},
    getUserById: (state, action) => {
      state.users = [action.payload];
    },
    // REVIEWS
    getAllReviews: (state, action) => {
      state.reviews = action.payload;
		},
    getReviewById: (state, action) => {
      state.reviews = action.payload;
    },
    getReviewByUserProfessionalId: (state, action) => {
      state.reviews = action.payload.reviews;
    },
    getReviewByUserClientId: (state, action) => {
      state.reviews = action.payload;
    },
    // ORDERS
    getAllOrders: (state, action) => {
      state.orders = action.payload;
		},
    getOrdersById: (state, action) => {
      state.orders = action.payload
    },
    // CLAIMS
    getAllClaims: (state, action) => {
      state.claims = action.payload;
		},
    getClaimsById: (state, action) => {
      state.claims = action.payload;
		},
	},
});
 
export const { getAllUsers,
               getAllReviews, 
               getReviewByUserProfessionalId, 
               getReviewById, 
               getAllOrders, 
               getUserById, 
               getOrdersById,
               getReviewByUserClientId,
               getAllClaims,
               getClaimsById } = adminSlice.actions;
export default adminSlice.reducer;
