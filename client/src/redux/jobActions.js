import axios from 'axios';
import { getAllJobs } from './userSlice'

export const getChars = () => (dispatch) => {
	axios
		.get('/jobs')
		.then((res) => {
			dispatch(getAllJobs(res.data));
		})
		.catch((e) => console.log(e));
};