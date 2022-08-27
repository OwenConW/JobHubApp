import axios from 'axios';
import { getAllReviews } from './reviewSlice.js'

export const actionGetAllReviews = () => (dispatch) => {
	axios
		.get('/review')
		.then((res) => {
			dispatch(getAllReviews(res.data));
		})
		.catch((e) => console.log(e));
}; 

export const actionFilterReviews = (filter) => (dispatch) => {
	
}