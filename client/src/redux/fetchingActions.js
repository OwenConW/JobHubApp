import axios from "axios";
import { fetchingMercadopagoLink, 
         fetchingMercadopagoLinkFailure,
         fetchingMercadopagoLinkSuccess,
         clearMercadopagoRedirectLink,
         setFetchingMercadoPagoLinkFalse } from './fetchingSlice.js';

export const actionFetchingMercadopagoLink = (mail) => (dispatch) => {
  dispatch(fetchingMercadopagoLink())
	axios
		.get(`/pagos/premium?mail=${mail}`)
		.then((res) => {
			dispatch(fetchingMercadopagoLinkSuccess(res.data));
		})
		.catch((e) => dispatch(fetchingMercadopagoLinkFailure()));
};

export const actionClearMercadopagoRedirectLink = () => (dispatch) => {
    dispatch(clearMercadopagoRedirectLink())
};

export const actionSetFetchingMercadoPagoLinkFalse = () => (dispatch) => {
  dispatch(setFetchingMercadoPagoLinkFalse())
};