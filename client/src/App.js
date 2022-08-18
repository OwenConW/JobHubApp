import React from "react";
import { Route } from "react-router-dom";
import './App.css';
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home"
import Catalog from './components/Catalog/Catalog';
import Map from "./components/Map/Map"


//Limpiar antes del pull
function App() {
	return (
		<div className="App">
			<Route exact path="/" component={Login} />
			<Route exact path="/home" component={Home} />
			<Route exact path="/professionals" component={Catalog}/>
			<Route exact path="/map" component={Map}/>
			<Route exact path='/profile' component={Profile}/>
		</div>
	);

}

export default App;
