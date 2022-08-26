import axios from 'axios';
import {
  getAllUsers,
} from './adminSlice.js';

export const getAllUsersForAdmin = () => (dispatch) => {
  axios.get('/users')
    .then((res) => {
      dispatch(getAllUsers(res.data))
    })
    .catch(e => console.error(e))
}

export const deleteUser = (id) => () => {
  axios.put(`/users/destroy/${id}`, {isActive: false})
}


export const editUser = (id, payload) => () => {
  console.log('action');
  axios.put(`/users/${id}`, payload)
}
