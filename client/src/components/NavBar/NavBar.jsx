import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getPokemonByName, getTypes } from "../../redux/actions/actions.js"
import Card from "../Card/Card.jsx";
import { NavLink } from "react-router-dom"
import { getPokemons} from "../../redux/actions/actions.js"
import estilos from "../../estilos/NavBar/NavBar.module.css";
export function NavBar(){

    const [input, setInput] = useState("")

    const dispatch = useDispatch()

    const pokemons = useSelector(state => state.pokemons)
        
    useEffect(() => {
    }, [pokemons])

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getPokemonByName(input));
        setInput("");
    }

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
          {
            pokemons.error && alert(pokemons.error) 
          }
          {
            pokemons.name && <Card {...pokemons} /> 
          }
        </div>
      </>
    );
}