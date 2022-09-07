import axios from 'axios';
import { getLocalStorage } from '../handlers/localStorage.js';
import {
	getAllUsers,
	getUserById,
	getFilteredProfessionals,
	clearDetails,
	// setActiveUser
} from './userSlice.js';


export const getChars = () => (dispatch) => {
	axios
		.get('/users/all/actives') 
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
		.get(`/users?rating=ASC`)
		.then((res) => {
			dispatch(getFilteredProfessionals(res.data));
		})
		.catch((e) => console.log(e));
};

export const filterProfessionals = (filters) => (dispatch) => {
	axios
		.get(
			`/users?name=${filters.name}&profession=${filters.profession}&rating=${filters.rating}`
		)
		.then((res) => {
			dispatch(getFilteredProfessionals(res.data));
		})
		.catch((e) => console.log(e));
};

export const clearUserDetail = () => (dispatch) => {
	dispatch(clearDetails());
}




//FUNCIONES QUE NO SON ACCIONES PERO QUEDABA BIEN METER ACA

export const modifyUser = (id, payload) => {
	axios.put(`/users/edit/${id}`, payload);
	getLocalStorage()
}


export const setInactiveUser = (id, payload) => {
	axios.put(`/users/destroy/${id}`, payload);
	getLocalStorage()
}

export const modifyProfessions = (id, payload) => {
	axios.put(`/users/${id}`, payload);
	getLocalStorage()
}

export const changeReview = (id, payload) =>  {
	axios.put(`/review/${id}`, payload);
	getChars()
}

export const getDniForm = (dni) =>  async (dispatch) => {
	try {
		const json = await axios.get(`/users/searchDni?dni=${dni}`)
		const response = await json.data
		dispatch({
			type: 'GET_DNI_FORM_BY_DNI',
			payload: response,
		})
		return response;
	} catch (error) {
		console.log(error)
	}
	
}

