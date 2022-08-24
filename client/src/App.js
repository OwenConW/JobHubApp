import React from "react";
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Profile from "./components/Profile/Profile";
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Catalog from './components/Catalog/Catalog';
import MapView from './components/Map/MapView';
import Chat from "./components/Chat/ChatEnVivo/Chat.jsx"
import Details from './components/Details/Details'
import Onboarding from "./components/Onboarding/Onboarding";


function App() {
	return (
		<div className="App">
			<Routes>
				<Route exact path="/" element={<Login />} />
				<Route exact path="/home" element={<Home />} />
				<Route exact path="/professionals" element={<Catalog />} />
				<Route exact path="/map" element={<MapView />} />
        		<Route exact path="/profile" element={<Profile />}/>
				<Route exact path="/details/:id" element={<Details />}/>
				<Route exact path="/onboarding" element={<Onboarding />}/>
				<Route exact path="/chat" element={<Chat/>}/>
			</Routes>
			
		</div>
	);
}

export default App;
