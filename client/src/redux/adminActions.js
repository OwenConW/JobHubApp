import axios from 'axios';
import {
  getAllReviews,
  getAllUsers,
  getAllOrders,
  getUserById,
  getReviewByUserId,
  getReviewById
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
  fetchingAdminRestoreUser,
  fetchingAdminRestoreUserSuccess,
  fetchingAdminRestoreUserFailure,
  fetchingAdminRestoreUserReset,

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
        //setea el estado (failure) a TRUE, para hacerle saber al usuario que hubo un error.
        dispatch(fetchingAdminDeleteUserFailure())
        dispatch(getAllUsersForAdmin())
      })
}

export const restoreUser = (id) => (dispatch) => {
  //setea el estado a TRUE, para hacerle saber al usuario que se esta "trabajando" (loading...)
  dispatch(fetchingAdminRestoreUser())
  axios.put(`/users/destroy/${id}`, {isActive: true})
  .then(r => {
        //setea el estado (success) a TRUE, para hacerle saber al usuario que la accion tuvo exito.
        dispatch(fetchingAdminRestoreUserSuccess())
        dispatch(getAllUsersForAdmin())
      })
      .catch(e => {
        //setea el estado (failure) a TRUE, para hacerle saber al usuario que hubo un error.
        dispatch(fetchingAdminRestoreUserFailure())
        dispatch(getAllUsersForAdmin())
      })
}


export const editUser = (id, payload) => (dispatch) => {
  dispatch(fetchingAdminEditUser())
  axios.put(`/users/admin/${id}`, payload)
  .then(res => {
    dispatch(getAllUsersForAdmin())
    dispatch(fetchingAdminEditUserSuccess())
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

export const actionFetchingAdminRestoreUserReset = () => (dispatch) => {
  dispatch(fetchingAdminRestoreUserReset())
}

// ======================= ACTIONS PARA REVIEWS =================================

export const getAllReviewsForAdmin = () => (dispatch) => {
  axios.get('/review/all')
    .then((res) => {
      dispatch(getAllReviews(res.data))
    })
    .catch(e => console.error(e))
}

export const getReviewByUserIdForAdmin = (id) => (dispatch) => {
  axios.get(`/review/${id}`)
    .then((res) => {
      console.log(res.data);
      if (!res.data) res.data = { reviews: []}
      dispatch(getReviewByUserId(res.data))
    })
    .catch(e => console.error(e))
}

export const getReviewByIdForAdmin = (id) => (dispatch) => {
  axios.get(`/review/admin/${id}`)
    .then((res) => {
      if (!res.data) {
        res.data = []
        return dispatch(getReviewById(res.data))
      } 
      dispatch(getReviewById([res.data]))
    })
    .catch(e => console.error(e))
}

export const editReview = (id, payload) => (dispatch) => {
  dispatch(fetchingAdminEditReview())
  axios.put(`/review/${id}`, payload)
  .then(res => {
    dispatch(fetchingAdminEditReviewSuccess())
    dispatch(getAllReviewsForAdmin())
    })
    .catch(e => {
      console.error(e);
      dispatch(fetchingAdminEditReviewFailure())
    })
}

export const deleteReviews = (id) => (dispatch) => {
  dispatch(fetchingAdminDeleteReview())
  axios.delete(`/review/admin/${id}`, {isActive: false})
      .then(r => {
        dispatch(fetchingAdminDeleteReviewSuccess())
        dispatch(getAllReviewsForAdmin())
      })
      .catch(e => {
        console.error(e)
        dispatch(fetchingAdminDeleteReviewFailure())
      })
}

export const actionFetchingAdminEditReviewReset = () => (dispatch) => {
  dispatch(fetchingAdminEditReviewReset())
}

export const actionFetchingAdminDeleteReviewReset = () => (dispatch) => {
  dispatch(fetchingAdminDeleteReviewReset())
}

// ======================= ACTIONS PARA ORDERS =================================

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
    dispatch(fetchingAdminEditOrderSuccess())
    dispatch(getAllOrdersForAdmin())
    })
    .catch(e =>{
      console.error(e)
      dispatch(fetchingAdminEditOrderFailure())
    })
}

export const deleteOrder = (id) => (dispatch) => {
  dispatch(fetchingAdminDeleteOrder())
  axios.delete(`/orders/admin/${id}`)
      .then(r => {
        dispatch(fetchingAdminDeleteOrderSuccess())
        dispatch(getAllOrdersForAdmin())
      })
      .catch(e => {
        console.error(e)
        dispatch(fetchingAdminDeleteOrderFailure())
      })
}

export const actionFetchingAdminEditOrderReset = () => (dispatch) => {
  dispatch(fetchingAdminEditOrderReset())
}

export const actionFetchingAdminDeleteOrderReset = () => (dispatch) => {
  dispatch(fetchingAdminDeleteOrderReset())
}
