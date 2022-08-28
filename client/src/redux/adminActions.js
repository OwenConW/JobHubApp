import axios from 'axios';
import {
  getAllReviews,
  getAllUsers,
  getAllOrders,
  getUserById
} from './adminSlice.js';
import {
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

} from './fetchingSlice.js';

// ======================= ACTIONS PARA USERS =================================
export const getAllUsersForAdmin = () => (dispatch) => {
  axios.get('/users/all')
    .then((res) => {
      dispatch(getAllUsers(res.data))
    })
    .catch(e => console.error(e))
}

export const getUsersByIdForAdmin = (id) => (dispatch) => {
  axios.get(`/users/${id}`)
    .then((res) => {
      dispatch(getUserById(res.data))
    })
    .catch(e => console.error(e))
}



export const deleteUser = (id) => (dispatch) => {
  //setea el estado a TRUE, para hacerle saber al usuario que se esta "trabajando" (loading...)
  dispatch(fetchingAdminDeleteUser())
  axios.put(`/users/destroy/${id}`, {isActive: false})
  .then(r => {
        //setea el estado (success) a TRUE, para hacerle saber al usuario que la accion tuvo exito.
        dispatch(fetchingAdminDeleteUserSuccess())
        dispatch(getAllUsersForAdmin())
      })
      .catch(e => {
        console.error(e)
        //setea el estado (failure) a TRUE, para hacerle saber al usuario que hubo un error.
        dispatch(fetchingAdminDeleteUserFailure())
        dispatch(getAllUsersForAdmin())
      })
}


export const editUser = (id, payload) => (dispatch) => {
  dispatch(fetchingAdminEditUser())
  axios.put(`/users/admin/${id}`, payload)
  .then(res => {
      dispatch(fetchingAdminEditUserSuccess())
      dispatch(getAllUsersForAdmin())
    })
    .catch(e =>{
      console.error(e)
      dispatch(fetchingAdminEditUserFailure())
      dispatch(getAllUsersForAdmin())
    })
}

export const actionFetchingAdminDeleteUserReset = () => (dispatch) => {
  dispatch(fetchingAdminDeleteUserReset())
}

export const actionFetchingAdminEditUserReset = () => (dispatch) => {
  dispatch(fetchingAdminEditUserReset())
}

// ======================= ACTIONS PARA REVIEWS =================================

export const getAllReviewsForAdmin = () => (dispatch) => {
  axios.get('/review/all')
    .then((res) => {
      dispatch(getAllReviews(res.data))
    })
    .catch(e => console.error(e))
}


export const editReview = (id, payload) => (dispatch) => {
  dispatch(fetchingAdminEditReview())
  axios.put(`/review/${id}`, payload)
  .then(res => {
    console.log(res);
    dispatch(fetchingAdminEditReviewSuccess())
    dispatch(getAllReviews())
    })
    .catch(e => console.error(e))
    dispatch(fetchingAdminEditReviewFailure())
}

// export const deleteReviews = (id) => (dispatch) => {
//   dispatch(fetchingAdminDeleteReview())
//   axios.delete(`/review/destroy/${id}`, {isActive: false})
//       .then(r => {
//         dispatch(fetchingAdminDeleteReviewSuccess())
//         dispatch(getAllReviews())
//       })
//       .catch(e => {
//         console.error(e)
//         dispatch(fetchingAdminDeleteReviewFailure())
//       })
// }

export const actionFetchingAdminEditReviewReset = () => (dispatch) => {
  dispatch(fetchingAdminEditReviewReset())
}

// ======================= ACTIONS PARA REVIEWS =================================

export const getAllOrdersForAdmin = () => (dispatch) => {
  axios.get('/orders/all')
    .then((res) => {
      dispatch(getAllOrders(res.data))
    })
    .catch(e => console.error(e))
}


export const editOrder = (id, payload) => (dispatch) => {
  dispatch(fetchingAdminEditOrder())
  axios.put(`/orders/${id}`, payload)
  .then(res => {
    console.log(res);
    dispatch(fetchingAdminEditOrderSuccess())
    dispatch(getAllOrders())
    })
    .catch(e => console.error(e))
    dispatch(fetchingAdminEditReviewFailure())
}

// export const deleteOrder = (id) => (dispatch) => {
//   dispatch(fetchingAdminDeleteOrder())
//   axios.delete(`/orders/destroy/${id}`, {isActive: false})
//       .then(r => {
//         dispatch(fetchingAdminDeleteOrderSuccess())
//         dispatch(getAllOrders())
//       })
//       .catch(e => {
//         console.error(e)
//         dispatch(fetchingAdminDeleteOrderFailure())
//       })
// }

export const actionFetchingAdminEditOrderReset = () => (dispatch) => {
  dispatch(fetchingAdminEditOrderReset())
}

export const actionFetchingAdminDeleteOrderReset = () => (dispatch) => {
  dispatch(fetchingAdminDeleteOrderReset())
}
