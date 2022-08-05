import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  Card  from "../Card/Card.jsx";
import { NavBar } from "../../components/NavBar/NavBar.jsx"
import  Paginado from "../Paginated/Paginado.jsx"
import { getPokemons, sortPokemons, getTypes, getPokemonsCreated, getPokemonsAPI, getAllPokemons, updatePage } from "../../redux/actions/actions.js"
import estilosCard from "../../estilos/Card/Card.module.css"
import estilosHome from "../../estilos/Home/Home.module.css"
// import * as filtrados from "../Filters-Orders/Filter.js"

export default function Home(){

    let key = 100;
    const currentPage = useSelector(state => state.currentPage)

    const [pagina, setPagina] = useState(currentPage)
    // eslint-disable-next-line no-unused-vars
    const [porPagina, setPorpagina] = useState(10)
    
    const dispatch = useDispatch();
    
    const pokemons = useSelector(state => state.pokemons);
    const tipos = useSelector(state => state.types)

    let maximo = pokemons.length > 1 ? Math.ceil(pokemons.length / porPagina ) : 1

    // maneja los filtrados por "tipo" de pokemon
    const handleTypes = () => {
        for (let option of document.getElementById('filter').options) {
            if (option.selected && option.value) {
                dispatch(updatePage(1))
                dispatch(sortPokemons("filter", option.value))
            }
        }
    }

    // cada vez que se actualiza el estado de redux "pokemons"
    useEffect(() => {
        dispatch(getAllPokemons())
        dispatch(getTypes())
        setPagina(currentPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokemons])
    
    // Maneja el click para volver a mostrar todo
    const handleClickShowAll = () => {
        dispatch(getPokemons());
        dispatch(getTypes());
        dispatch(getAllPokemons())
        dispatch(updatePage(1))
    } 

    // Maneja el click de ordenamientos
    const handleOrders = (e) => {
        dispatch(updatePage(1))
        dispatch(sortPokemons(e.target.name))
    }

    // Maneja el click de filtrar por api
    const handleClickAPI = () => {
        dispatch(updatePage(1))
        dispatch(getPokemonsAPI())
    }

    // Maneja el click de filtrar por db
    const handleClickDB = () => {
        dispatch(updatePage(1))
        dispatch(getPokemonsCreated())
    }

    return( 
        <> 
            <NavBar></NavBar>
            <div >
            {
                pokemons.length ? <div className={estilosHome.ContainerButtons}>
                    <button name={"AZ"} onClick={handleOrders} className={estilosHome.buttons}>A-Z</button>
                    <button name={"ZA"} onClick={handleOrders} className={estilosHome.buttons}>Z-A</button>
                    <button name={"MAX_MIN"} onClick={handleOrders} className={estilosHome.buttons}>Max Attack</button>
                    <button name={"MIN_MAX"} onClick={handleOrders} className={estilosHome.buttons}>Min Attack</button>
                    <select id="filter" name="filter" onClick={handleTypes} className={estilosHome.buttons} defaultValue="ALL TYPES">
                    <option value={"ALL TYPES"} className={estilosHome.selected}>{"ALL TYPES"}</option>) 
                    {
                     tipos && tipos.length && tipos.map((t,i) => <option key={i} value={`${t}`} className={estilosHome.selected}>{`${t}`}</option>) 
                    }
                    </select>
                    <button onClick={handleClickDB} className={estilosHome.buttons}>CREATED ONLY</button>
                    <button onClick={handleClickAPI} className={estilosHome.buttons}>VANILLA ONLY</button>
                    {/* <button name={"TOP_5"} onClick={handleOrders} className={estilosHome.buttons}>TOP_5</button> */}
                    
                </div>  
                : false
            }
            {/* Si hay longitud muestro el paginado */}
            {
                pokemons.length ? <Paginado pagina={pagina} setPagina={setPagina} maximo={maximo}></Paginado> : false
            }
           </div>
            <div className={estilosCard.containerCard}>
            {/* Si se detecta longitud en el array de pokemons, se lo divide con una "ecuacion" para dividirlo en base al paginado
            y si no tiene longitud pero tiene nombre solo se muestra el boton, si no el gif y el boton */}
            {
                pokemons.length
                ? <> {pokemons.slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina)
                    .map(p => <Card key={key++} {...p}/>)}</>
                :!pokemons.name ? <div className={estilosHome.contenedorNoPokemons}><img className={estilosHome.NoPokemonsIMG} alt="nopokemonsimg" src="https://i.gifer.com/origin/7d/7dab25c7b14a249bbc4790176883d1c5_w200.gif"/><button onClick={handleClickShowAll} className={estilosHome.ShowAllButton}>SHOW ALL</button></div> : <><button onClick={handleClickShowAll} className={estilosHome.OnePokemon}>SHOW ALL</button></>
            }
            
            </div>
        </>
        )
}
    

