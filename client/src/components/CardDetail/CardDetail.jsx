import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getById , cleanDetails, getTypes} from "../../redux/actions/actions.js"
import estilos from "../../estilos/CardDetail/CardDetail.module.css"
// import Hacker from "../../estilos/Images/hacker.png"
import sword from "../../estilos/Images/sword.png"
import shield from "../../estilos/Images/shield.png"


export function CardDetail(props){

    const history = useHistory()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getById(props.match.params.id))
        return () => {
            dispatch(cleanDetails())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // Function que se encarga de volver para atras
    const handleBack = () => {
        history.goBack()
        dispatch(getTypes())
    }

    const pokemonbyname = useSelector(state => state.pokemonbyname)
    return(
        <>
        <button onClick={handleBack} className={estilos.BackButton}>GO BACK</button>
        <div className={estilos.contenedor}>
            {/* Si en el estado de redux "pokemonbyname" hay nombre entonces mapeo la card */}
            {
                pokemonbyname.name ? 
                    <div className={estilos.flip_card}>
                    <div className={estilos.flip_card_inner}>
                        <div className={estilos.flip_card_front}>
                            <h1 className={estilos.id}>ID: {pokemonbyname.id}</h1>
                            <h1 className={estilos.name}>{pokemonbyname.name}</h1>
                            {pokemonbyname.image 
                            ? pokemonbyname.id <= 40 ? <img src={pokemonbyname.image} className={estilos.image} alt="imagenpokemon"></img> : <img src={pokemonbyname.image} alt="imagenPokemon"className={estilos.img}></img> 
                            : <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png" alt="imagenDefault" className={estilos.imgDefault}></img>
                            }
                        </div>
                        <div className={estilos.flip_card_back}>
                        <h1 className={estilos.name}>{pokemonbyname.name}</h1>
                            <div className={estilos.stats}>
                                <div className={estilos.statsColumns}>
                                <b className={estilos.statB}><img src={`https://cdn-icons-png.flaticon.com/512/1142/1142172.png`} alt="hp" className={estilos.icon}/>HEALTH: {pokemonbyname.hp}</b>
                                <b className={estilos.statB}><img src={`https://cdn-icons-png.flaticon.com/512/3563/3563403.png`} alt="speed" className={estilos.icon}/>SPEED: {pokemonbyname.speed}</b>
                                </div>
                                
                                <div className={estilos.statsColumns}>
                                <b className={estilos.statB}><img src={sword} alt="attack" className={estilos.icon}/>ATTACK: {pokemonbyname.attack}</b>
                                <b className={estilos.statB}><img src={shield} alt="defense" className={estilos.icon}/>DEFENSE: {pokemonbyname.defense}</b>
                                </div>
                                <div className={estilos.statsColumns}>
                                    {
                                        pokemonbyname.id <= 40 ?  <b className={estilos.statB}><img src={`https://cdn-icons-png.flaticon.com/512/4516/4516746.png`} alt="height" className={estilos.icon}/>HEIGHT: {pokemonbyname.height *10}cm</b> 
                                        : <b className={estilos.statB}><img src={`https://cdn-icons-png.flaticon.com/512/4516/4516746.png`} alt="height" className={estilos.icon}/>HEIGHT: {pokemonbyname.height}cm</b> 
                                    }
                                    {
                                        pokemonbyname.id <= 40 ? <b className={estilos.statB}><img src={`https://cdn-icons-png.flaticon.com/512/3134/3134405.png`} alt="weight" className={estilos.icon}/>WEIGHT: {pokemonbyname.weight / 10}kg</b> 
                                        :<b className={estilos.statB}><img src={`https://cdn-icons-png.flaticon.com/512/3134/3134405.png`} alt="weight" className={estilos.icon}/>WEIGHT: {pokemonbyname.weight}kg</b> 
                                    }
                                
                                </div>
                            </div>
                        <h1 className={estilos.tipos}><img src={`https://cdn-icons-png.flaticon.com/512/362/362003.png`} alt="types" className={estilos.icon}/>TYPES:</h1>
                        {/* Me fijo en la id (db/api) y en si hay tipos para mapear cada uno de ellos */}
                        { 
                           pokemonbyname.id <= 40 && pokemonbyname.types 
                           ?  <> {pokemonbyname.types.map((t, i) =><h3 key={i} className={estilos.tiposCu}>{t}</h3>)}</>
                           : pokemonbyname.types && <> {pokemonbyname.types.map((t, i) => <><h3 key={i} className={estilos.tiposCu}>{t.name}</h3></>)}</>
                        }
                        </div>
                    </div>
                </div>
                : <div className={estilos.contenedorNoPokemons}><img className={estilos.NoPokemonsIMG} alt="nopokemonsimg" src="https://i.gifer.com/origin/7d/7dab25c7b14a249bbc4790176883d1c5_w200.gif"/></div>
            }
            {/* Si en el estado de redux "pokemonbyname" no hay nombre entonces muestro un gif */}
        </div>
        </>
    )
}