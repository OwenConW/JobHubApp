import React from 'react';
import './App.css';
import Login from "./components/Login/Login";

import Navbar from './components/Navbar/Navbar';
import Catalog from './components/Catalog/Catalog';

//Limpiar antes del pull
function App() {
	return (
		<div className="App">
			<Navbar />
			<Catalog />
		</div>
	);

}

export default App;
