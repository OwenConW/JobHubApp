import React from "react";
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Profile from "./components/Profile/Profile";
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Catalog from './components/Catalog/Catalog';
import MapView from './components/Map/MapView';
import Details from './components/Details/Details'
import Onboarding from "./components/Onboarding/Onboarding";
import Chat from "./components/LiveChat/Chat/Chat.jsx"
import ProfileConfig from './components/ProfileConfig/ProfileConfig';
import Faq from './components/Faq/Faq';
import Orders from './components/Orders/Orders';
import FormReturn from "./components/FormReturn/FormReturn"
import Navbar from './components/Navbar/Navbar';
import Support from './components/Support/Support';

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
				<Route exact path="/returnUser" element={<FormReturn/>}/>
				<Route exact path="/chat" element={<Chat/>}/>
        		<Route exact path="/faq" element={<Faq />}/>
				<Route exact path="/ProfileConfig/:id" element={<ProfileConfig />}/>
				<Route exact path="/myorders" element={<Orders/>}/>
				<Route exact path="/nav" element={<Navbar />} />
				<Route exact path="/support" element={<Support />} />
			</Routes>
		</div>
	);
}

export default App;
