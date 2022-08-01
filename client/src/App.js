import React from "react";
import { Route, Switch } from "react-router-dom";
import  Landing  from "./components/Landing/Landing.jsx"
import Home  from "./components/Home/Home.jsx"
import Form from "./components/Form/Form.jsx"
import { CardDetail } from './components/CardDetail/CardDetail';
// eslint-disable-next-line no-unused-vars
import normalize from "./estilos/global/normalize.css"
// eslint-disable-next-line no-unused-vars
import globales from "./estilos/global/global.css"
import { About } from "./components/About/About.jsx"
import { error } from "./components/error/error.jsx"


function App() {
  return (
    <>
    <Switch>
        <Route exact path="/"component={Landing}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/create" component={Form}/>
        <Route exact path="/pokemons/:id" component={CardDetail}/>
        <Route exact path="/about" component={About}/>
        <Route path="/:cualquiercosa" component={error}/>
    </Switch>
    </>
  );
}

export default App;
