import axios from 'axios';
import { getAllJobs } from './jobSlice'

export const actionGetAllJobs = () => (dispatch) => {
	axios
		.get('/jobs')
		.then((res) => {
			dispatch(getAllJobs(res.data));
		})
		.catch((e) => console.log(e));
};