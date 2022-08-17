import React from 'react';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import Catalogo from './components/Catalogo/Catalogo';

function App() {
	return (
		<div className="App">
			<Navbar />
			<Catalogo />
		</div>
	);
}

export default App;
