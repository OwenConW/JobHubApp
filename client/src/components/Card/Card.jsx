import React from "react"
import { Link } from "react-router-dom"
// import { useDispatch } from "react-redux"
import estilos from "../../estilos/Card/Card.module.css"
// import { deletePokemon } from "../../redux/actions/actions.js"

export default function Card(props){

    // const dispatch = useDispatch()

    // const handleDelete = () => {
    //     dispatch(deletePokemon(props.name, props.id))
    // }

    return(
        <div className={estilos.flip_card}>
            <div className={estilos.flip_card_inner}>
                <div className={estilos.flip_card_front}>
                    {props.image 
                    ? props.id <= 40  ? <img src={props.image} className={estilos.img} alt="imagenpokemon"></img> : <img src={props.image} className={estilos.image} alt="imagenpokemond"></img>
                    : <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png" alt="imagenpokemondefault" className={estilos.img}></img>
                }
                   <h1 className={estilos.name}>{props.name}</h1>
                </div>

                <div className={estilos.flip_card_back}>
                <Link to={`/pokemons/${props.id}`} className={estilos.Link}>
                {/* <button onClick={handleDelete}>BORRAR</button> */}
                        <h1 className={estilos.name}>{props.name}</h1>
                <h1 className={estilos.tipos}>Types:</h1>
                {
                    props.id <= 40 && props.types 
                    ?  <> {props.types.map((t, i) =><h3 key={i} className={estilos.tiposCu}>{t}</h3>)}</>
                    : props.types && <> {props.types.map((t, i) => <h3 key={i} className={estilos.tiposCu}>{t.name}</h3>)}</>
                }
                </Link>
                </div>
            </div>
        </div>
    )
}

