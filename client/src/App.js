import React from "react";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Profile from "./components/Profile/Profile";
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Catalog from './components/Catalog/Catalog';
import Map from './components/Map/Map';
import Details from './components/Details/Details'

//Limpiar antes del pull
function App() {
	return (
		<div className="App">
			<Routes>
				<Route exact path="/" element={<Login />} />
				<Route exact path="/home" element={<Home />} />
				<Route exact path="/professionals" element={<Catalog />} />
				<Route exact path="/map" element={<Map />} />
        		<Route exact path="/profile" element={<Profile />}/>
				<Route exact path="/details/:id" element={<Details />}/>
			</Routes>
		</div>
	);
}

export default App;
