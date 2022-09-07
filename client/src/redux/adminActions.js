import axios from 'axios';
import { actionGetAllJobs } from './jobActions'
import {
  getAllReviews,
  getAllUsers,
  getAllOrders,
  getUserById,
  getReviewByUserProfessionalId,
  getReviewById,
  getOrdersById,
  getReviewByUserClientId,
  getAllClaims,
  getClaimsById
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
  fetchingAdminCreateProfession,
  fetchingAdminCreateProfessionSuccess,
  fetchingAdminCreateProfessionFailure,
  fetchingAdminCreateProfessionReset,
  fetchingAdminDeleteProfession,
  fetchingAdminDeleteProfessionSuccess,
  fetchingAdminDeleteProfessionFailure,
  fetchingAdminDeleteProfessionReset,
  fetchingUsers,
  fetchingUsersSuccess,
  fetchingUsersFailure,
  fetchingUsersReset,
  fetchingAdminDeleteClaim,
  fetchingAdminDeleteClaimSuccess,
  fetchingAdminDeleteClaimFailure,
  fetchingAdminDeleteClaimReset
} from './fetchingSlice.js';

// ======================= ACTIONS PARA USERS =================================
export const getAllUsersForAdmin = () => (dispatch) => {
  dispatch(fetchingUsers())
  axios.get('/users/all')
  .then((res) => {
    dispatch(getAllUsers(res.data))
    dispatch(fetchingUsersSuccess())
  })
  .catch(e => {
    console.error(e)
    dispatch(fetchingUsersFailure())
  })
}

export const getUsersByIdForAdmin = (id) => (dispatch) => {
  axios.get(`/users/${id}`)
    .then((res) => {
      dispatch(getUserById(res.data))
    })
    .catch(e => console.error(e))
}

export const getUsersByFilterForAdmin = (payload) => (dispatch) => {
  const { name, last_Name, profession } = payload;
  axios.get(`/users/filter?name=${name}&last_Name=${last_Name}&profession=${profession}`, payload)
    .then((res) => {
      dispatch(getAllUsers(res.data))
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
  axios.put(`/users/${id}`, payload)
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

export const modifyUserStatus = (field, id, payload) => (dispatch) => {
  //crear error handler para esta action
  axios.put(`/users/${field}/${id}`, payload)
  .then(res => {
    dispatch(getAllUsersForAdmin())
  })
    .catch(e =>{
      console.error(e)
      dispatch(getAllUsersForAdmin())
    })
}

export const actionFetchingUsersReset = () => (dispatch) => {
  dispatch(fetchingUsersReset())
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

export const getReviewByUserProfessionalIdForAdmin = (id) => (dispatch) => {
  axios.get(`/review/${id}`)
    .then((res) => {
      //console.log(res.data);
      if (!res.data) res.data = { reviews: []}
      dispatch(getReviewByUserProfessionalId(res.data))
    })
    .catch(e => console.error(e))
}

//por ID cliente NECESITA LA RUTA DEL BACKEND!!!!
export const getReviewByUserClientIdForAdmin = (id) => (dispatch) => {
  axios.get(`/review/admin/client/${id}`)
    .then((res) => {
      //console.log(res.data);
      if (!res.data) res.data = []
      dispatch(getReviewByUserClientId(res.data))
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

export const actionGetOrdersBylId = (id) => (dispatch) => {
  axios.get(`/orders/admin/${id}`)
    .then((res) => {
      dispatch(getOrdersById([res.data]))
    })
    .catch(e => console.error(e))
}

export const getOrdersByUserProfessionalId = (id) => (dispatch) => {
  axios.get(`/orders/professional/${id}`)
    .then((res) => {
      dispatch(getOrdersById(res.data.orders))
    })
    .catch(e => console.error(e))
}

export const getOrdersByUserClientId = (id) => (dispatch) => {
  axios.get(`/orders/client/${id}`)
    .then((res) => {
      dispatch(getOrdersById(res.data))
    })
    .catch(e => console.error(e))
}

export const actionFetchingAdminEditOrderReset = () => (dispatch) => {
  dispatch(fetchingAdminEditOrderReset())
}

export const actionFetchingAdminDeleteOrderReset = () => (dispatch) => {
  dispatch(fetchingAdminDeleteOrderReset())
}


// ======================= ACTIONS PARA PROFESIONES =================================

export const createProfession = (name) => (dispatch) => {
  dispatch(fetchingAdminCreateProfession())
  axios.post(`/jobs/create`, {name})
      .then(r => {
        dispatch(actionGetAllJobs())
        dispatch(fetchingAdminCreateProfessionSuccess())
      })
      .catch(e => {
        dispatch(fetchingAdminCreateProfessionFailure())
        console.error(e)
      })
}

export const deleteProfession = (id) => (dispatch) => {
  dispatch(fetchingAdminDeleteProfession())
  axios.delete(`/jobs/admin/${id}`)
      .then(r => {
        dispatch(actionGetAllJobs())
        dispatch(fetchingAdminDeleteProfessionSuccess())
      })
      .catch(e => {
        console.error(e)
        dispatch(fetchingAdminDeleteProfessionFailure())
      })
}

export const actionFetchingAdminCreateProfessionReset = () => (dispatch) => {
  dispatch(fetchingAdminCreateProfessionReset())
}

export const actionFetchingAdminDeleteProfessionReset = () => (dispatch) => {
  dispatch(fetchingAdminDeleteProfessionReset())
}

// ======================= ACTIONS PARA CLAIMS =================================

export const getAllClaimsForAdmin = () => (dispatch) => {
  axios.get('/claims')
  .then((res) => {
      dispatch(getAllClaims(res.data))
    })
    .catch(e => console.error(e))
}

export const getClaimsByProfessionalIdForAdmin = (id) => (dispatch) => {
  axios.get(`/claims/${id}`)
  .then((res) => {
    //console.log(res.data);
      dispatch(getClaimsById(res.data.claims))
    })
    .catch(e => console.error(e))
}

export const getClaimsByClientIdForAdmin = (id) => (dispatch) => {
  axios.get(`/claims/client/${id}`)
  .then((res) => {
    //console.log(res.data);
      dispatch(getClaimsById(res.data))
    })
    .catch(e => console.error(e))
}

export const getClaimsByTypeForAdmin = (type) => (dispatch) => {
  axios.get(`/claims/reason?subject=${type}`)
  .then((res) => {
    //console.log(res.data);
      dispatch(getClaimsById(res.data))
    })
    .catch(e => console.error(e))
}

export const deleteClaim = (id) => (dispatch) => {
  dispatch(fetchingAdminDeleteClaim())
  //console.log('action');
  axios.delete(`/claims/${id}`)
  .then(r => {
    dispatch(fetchingAdminDeleteClaimSuccess())
        dispatch(getAllClaimsForAdmin())
      })
      .catch(e => {
        //console.log('action errors');
        dispatch(fetchingAdminDeleteClaimFailure())
        console.error(e)
      })
}

export const actionFetchingAdminDeleteClaimReset = () => (dispatch) => {
  dispatch(fetchingAdminDeleteClaimReset())
}
