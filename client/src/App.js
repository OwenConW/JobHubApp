import React from 'react';
import './App.css';
import Login from './components/Login/Login';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Catalog from './components/Catalog/Catalog';
import Map from './components/Map/Map';

//Limpiar antes del pull
function App() {
	return (
		<div className="App">
			<Routes>
				<Route exact path="/" element={<Login />} />
				<Route exact path="/home" element={<Home />} />
				<Route exact path="/professionals" element={<Catalog />} />
				<Route exact path="/map" element={<Map />} />
			</Routes>
		</div>
	);
}

export default App;
