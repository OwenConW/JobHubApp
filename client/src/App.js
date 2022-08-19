import React from "react";
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Profile from "./components/Profile/Profile";
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Catalog from './components/Catalog/Catalog';
import Map from './components/Map/Map';
import UploadImage from "./components/uploadImage/UploadImage"
import Details from './components/Details/Details'
import Onboarding from "./components/Onboarding/Onboarding";


function App() {
	return (
		<div className="App">
			<UploadImage></UploadImage>
		</div>
	);
}

export default App;
