import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  Card  from "../Card/Card.jsx";
import { NavBar } from "../../components/NavBar/NavBar.jsx"
import  Paginado from "../Paginated/Paginado.jsx"
import { getPokemons, sortPokemons, getTypes, getPokemonsCreated, getPokemonsAPI} from "../../redux/actions/actions.js"
import estilosCard from "../../estilos/Card/Card.module.css"
import estilosHome from "../../estilos/Home/Home.module.css"
import * as filtrados from "../Filters-Orders/Filter.js"


export default function Home(){

    const [pagina, setPagina] = useState(1)
    // eslint-disable-next-line no-unused-vars
    const [porPagina, setPorpagina] = useState(10)
    
    let key = 100;
    const dispatch = useDispatch();
    
    
    const pokemons = useSelector(state => state.pokemons);
    const tipos = useSelector(state => state.types)

    let maximo = pokemons.length > 1 ? Math.ceil(pokemons.length / porPagina ) : 1

   
    
    const handleTypes = () => {
        for (let option of document.getElementById('filter').options) {
            if (option.selected) {
                dispatch(sortPokemons(filtrados.filterByType(option.value, pokemons)))
            }
        }
    }

    useEffect(() => {
        dispatch(getTypes())
        setPagina(1)
    }, [dispatch, pokemons])
    
    const handleClick = () => {
        dispatch(getPokemons())
        dispatch(getTypes())
    }

    return( 
        <> 
            <NavBar></NavBar>
            <div >
            {
                pokemons.length ? <div className={estilosHome.ContainerButtons}>
                    <button onClick={() => dispatch(sortPokemons(filtrados.orderA_z(pokemons)))} className={estilosHome.buttons}>A-Z</button>
                    <button onClick={() => dispatch(sortPokemons(filtrados.orderZ_a(pokemons)))} className={estilosHome.buttons}>Z-A</button>
                    <button onClick={() => dispatch(sortPokemons(filtrados.orderMax_MinAttack(pokemons)))} className={estilosHome.buttons}>Max Attack</button>
                    <button onClick={() => dispatch(sortPokemons(filtrados.orderMin_MaxAttack(pokemons)))} className={estilosHome.buttons}>Min Attack</button>
                    <select id="filter" name="filter" onClick={handleTypes} className={estilosHome.buttons}>
                    {
                     tipos && tipos.length && tipos.map((t,i) => <option key={i} value={`${t}`} className={estilosHome.selected}>{`${t}`}</option>) 
                    }
                    </select>
                    {
                        pokemons.length && <button onClick={() =>dispatch(getPokemonsCreated())} className={estilosHome.buttons}>CREATED ONLY</button>
                    }
                    {
                        pokemons.length && <button onClick={ () => dispatch(getPokemonsAPI())} className={estilosHome.buttons}>VANILLA ONLY</button>
                    }
                </div>
                : false
            }
            {
                pokemons.length ? <Paginado pagina={pagina} setPagina={setPagina} maximo={maximo}></Paginado> : false
            }
           </div>
            <div className={estilosCard.containerCard}>
            {
                pokemons.length
                ? <> {pokemons.slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina)
                    .map(p => <Card key={key++} {...p}/>)}</>
                :!pokemons.name ? <div className={estilosHome.contenedorNoPokemons}><img className={estilosHome.NoPokemonsIMG} alt="nopokemonsimg" src="https://i.gifer.com/origin/7d/7dab25c7b14a249bbc4790176883d1c5_w200.gif"/><button onClick={handleClick} className={estilosHome.ShowAllButton}>SHOW ALL</button></div> : <><button onClick={handleClick} className={estilosHome.OnePokemon}>SHOW ALL</button></>
            }
            </div>
        </>
        )
    }
    
    
