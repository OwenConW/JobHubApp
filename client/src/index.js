import React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Auth0Provider } from "@auth0/auth0-react";
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

<<<<<<< HEAD
axios.defaults.baseURL =  process.env.REACT_APP_URL || 'http://localhost:3001';
=======
axios.defaults.baseURL = process.env.REACT_APP_URL || 'http://localhost:3001';
>>>>>>> 8b514319106a23833f2f77e287728935562f45ab

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Auth0Provider

	domain='dev-gv15gu89.us.auth0.com'
	clientId='qTXIkxKGxhYY76ZJ14YegPBAz4oeZ20P'
	redirectUri={window.location.origin}
	>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
