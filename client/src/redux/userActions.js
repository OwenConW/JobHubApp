import axios from 'axios';
import {
	getAllUsers,
	getUserById,
	actionGetUsersByNameOrJob,
} from './userSlice.js';

export const getChars = () => (dispatch) => {
	axios
		.get('/users')
		.then((res) => {
			dispatch(getAllUsers(res.data));
		})
		.catch((e) => console.log(e));
};

export const getCharsById = (id) => (dispatch) => {
	axios
		.get(`/users/${id}`)
		.then((res) => {
			dispatch(getUserById(res.data));
		})
		.catch((e) => console.log(e));
};

export const getUsersByNameOrJob = (input) => (dispatch) => {
	axios
		.get(`/users?search=${input}`)
		.then((res) => {
			dispatch(actionGetUsersByNameOrJob(res.data));
		})
		.catch((e) => console.log(e));
};
