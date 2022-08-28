import axios from 'axios';
import { getAllOrders } from './orderSlice.js'

export const actionGetAllOrders = (id) => (dispatch) => {
	axios
		.get(`/orders/client/${id}`)
		.then((res) => {
			dispatch(getAllOrders(res.data));
		})
		.catch((e) => console.log(e));
}; 

