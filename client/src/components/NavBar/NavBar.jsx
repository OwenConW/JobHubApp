import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getPokemonByName, getTypes } from "../../redux/actions/actions.js"
import Card from "../Card/Card.jsx";
import { NavLink } from "react-router-dom"
import { getPokemons} from "../../redux/actions/actions.js"
import estilos from "../../estilos/NavBar/NavBar.module.css";


export function NavBar(){

  const dispatch = useDispatch()
  
  const [input, setInput] = useState("")

  const pokemons = useSelector(state => state.pokemons)
  
  // Function que setea el estado local input a medida que se escribe en el input
  const handleChange = (e) => {
    setInput(e.target.value)
  }

  // Function manejadora del boton de buscar pokemon
  const handleSubmit = (e) => {
    e.preventDefault();
    if(input.length){
    dispatch(getPokemonByName(input.toLowerCase()))
    setInput("") 
    } 
    
  }

  // Function manejadora del boton limpiar filtros 
  // que limpia el estado de pokemons que se muestra en pantalla
  const handleClick = () => {
    dispatch(getPokemons())
    dispatch(getTypes())
  }

  return (
      <>
        <div className={estilos.contenedorNav}>
          <div className={estilos.contenedorButtons}>
          <button onClick={handleClick} className={estilos.BackButton}>Clear Filters</button>
          <ul>
            <li>
              <NavLink to="/about" className={estilos.NavLinkNavBar}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/create" className={estilos.NavLinkNavBar}>
                Create Pokemon
              </NavLink>
            </li>
          </ul>
          </div>
          <h1 className={estilos.title}>PoKéMoN</h1>
          <form onSubmit={handleSubmit} className={estilos.form}>
            <input
              className={estilos.input}
              name="name"
              value={input}
              placeholder="Search pokémon by name..."
              autoComplete="off"
              onChange={handleChange}
            ></input>
            <button type="submit" className={estilos.button}></button>
          </form>
        </div>
        <div className={estilos.response}>
          {/* Si el estado de redux tiene la prop name es porque se piso correctamente con la busqueda exitosa */}
          {
            pokemons.name && <Card {...pokemons} /> 
          }
        </div>
      </>
    );
}