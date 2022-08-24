import axios from 'axios';
import {
	getAllUsers,
	getUserById,
	getFilteredProfessionals,
	setActiveUser
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

export const getLeadingProfessionals = () => (dispatch) => {
	axios
		.get(`/users?rating=asc&isProfessional=true`)
		.then((res) => {
			dispatch(getUserById(res.data));
		})
		.catch((e) => console.log(e));
};

export const filterProfessionals = (filters) => (dispatch) => {
	console.log('filters profession: ', filters.profession);
	axios
		.get(
			`/users?name=${filters.name}&profession=${filters.profession}&rating=${filters.rating}`
		)
		.then((res) => {
			console.log(res.data);
			dispatch(getFilteredProfessionals(res.data));
		})
		.catch((e) => console.log(e));
};