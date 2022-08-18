import React from "react";
import { Route } from "react-router-dom";
import './App.css';
import Card from "./components/Card/Card.jsx";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Catalog from './components/Catalog/Catalog';


function App() {
  return (
    <div className="App">
    
        <Route path='/' component={Navbar}/>
        <Route path='/home' component={Card}/>
        <Route path='/profile' component={Profile}/>

    </div>
  );

}

export default App;
