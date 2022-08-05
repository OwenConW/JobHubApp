import React, { useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPokemon, getLasCreated, getTypes, getAllPokemons, cleanForm, getPokemons, updatePage} from "../../redux/actions/actions.js"
import Card from "../Card/Card.jsx"
import estilos from "../../estilos/Form/Form.module.css"
import { useHistory } from "react-router-dom"

export default function Form(){
    
    const history = useHistory()
    const dispatch = useDispatch();

    const [creado, setCreado] = useState({});
    const [names, setNames] = useState([]) ;
    const [input, setInput] = useState({
        name: "",
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        image: "",
        height: 0,
        weight: 0,
        types: []
       
    })
    const [errors, setErrors] = useState({});
    
    const tipos = useSelector(state => state.types);
    const toNames = useSelector(state => state.const);
    const pokemonName = useSelector(state => state.pokemonC);
    const pokemonCreado = useSelector(state => state.pokemonbyname);
    
    // Lo realiza solo cuando el componenete nace
    useEffect(() => {
        dispatch(getAllPokemons());
        dispatch(getTypes());
        setNames(() => toNames);
        return () => {
            dispatch(cleanForm());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // lo realiza cuando el componente nace y cuando se actualiza el estado global de "pokemonbyname"
    useEffect(() => {
        dispatch(getAllPokemons());
        setCreado(() => pokemonCreado);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokemonCreado]);
    
    
    // boton para volver atras
    const handleClickBack = () => {
        dispatch(getTypes());
        history.goBack()
    }

    // funcion manejadora del input del formulario, setea errores si los hay
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value.toLowerCase()
        })
        setErrors(validateInput({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    // funcion manejadora de las selecciones de tipos, tmb setea errores si los hay
    function hanldeChangeType(e) {
        var selected = [];
        for (let option of document.getElementById('types').options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }
        setInput({
            ...input,
            types: selected,
        })
        setErrors(validateInput({
            ...input,
            types: selected
        }))
    }


    // funcion controladora del envio del formulario 
    const handleSubmitC = (e) => {
        e.preventDefault();
        Object.keys(validateInput(input)).length 
        // Si hay errores le pido que la revise
        ? alert("Please check the information!")
        // si el nombre no existe en los pokemons ya existentes
        : !names.find(obj => obj.name.toLowerCase() === input.name.toLowerCase())
        // dipatch y reseteo inputs
        ? dispatch(createPokemon(input)) && setInput({
            name: "",
            hp: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            image: "",
            height: 0,
            weight: 0,
            types: []
        }) 
        // alerto que ya existe
        : alert(`${input.name} already exists!`);
        dispatch(updatePage(1))
        dispatch(getPokemons())
        // names.some(obj => obj.name.toLowerCase() === input.name.toLowerCase()) 
        // ? alert("El nombre ingresado ya existe")
        // : dispatch(createPokemon(input))
    }
    

    // boton para traer el pokemon una vez renderizado junto con el msj de creacion
    const handleGetPokemon = () => {
        dispatch(getPokemons())
        dispatch(getLasCreated(pokemonName.nombre));
    }


    // limpia el form on blur del input name
    const handleBlur = () => {
        // dispatch(getAllPokemons());
        dispatch(cleanForm());
        setNames(() =>  toNames);
    }


    return (
        <>
        <div className={estilos.header}>
            <button onClick={handleClickBack} className={estilos.BackButton}>GO BACK</button>
            <h1 className={estilos.title}>CrEaTe PoKéMoN:</h1>
        </div>
        <div className={estilos.Padre}>
            <div className={estilos.ContenedorForm}>
            <div className={estilos.Form}>
            <form onSubmit={handleSubmitC} autoComplete="off">
        <div className={estilos.First}>
            <div className={ errors.name ? estilos.warning :estilos.DivInput}>
            {/* INPUT NAME */}
            <label className={estilos.Label}>* Name:</label>
        
            <input className={estilos.InputFormName} type="text" name="name" placeholder="Please enter a name..." value={input.name} onChange={handleChange} onBlur={handleBlur} required></input>
            {
                errors.name ? <p>{errors.name}</p> : <p>ㅤ</p>         
            }
            </div>
            </div>
            <div className={estilos.Second}>
            <div className={errors.hp ? estilos.warning :estilos.DivInput}>
            {/* INPUT HP */}
            <label className={estilos.Label}>* Health: <b className={estilos.aclaraciones}>(1 - 100)</b></label>
            <input className={estilos.InputForm} type="number" name="hp" value={input.hp}  onChange={handleChange} required></input>
            {
                errors.hp ? <p>{errors.hp}</p> : <p>ㅤ</p>         
            }
            </div>
            <div className={ errors.attack ? estilos.warning :estilos.DivInput}>
            {/* INPUT ATTACK */}
            <label className={estilos.Label}>* Attack: <b className={estilos.aclaraciones}>(1 - 300)</b></label>
            <input  className={estilos.InputForm} type="number" name="attack" value={input.attack} onChange={handleChange} required></input>
            {
                errors.attack ? <p>{errors.attack}</p> : <p>ㅤ</p>
            }
            </div>
            <div className={errors.defense ? estilos.warning :estilos.DivInput}>
            {/* INPUT DEFENSE */}
            <label className={estilos.Label}>* Defense: <b className={estilos.aclaraciones}>(1 - 300)</b></label>
            <input className={estilos.InputForm} type="number" name="defense" value={input.defense}  onChange={handleChange} required></input>
            {
                errors.defense ? <p>{errors.defense}</p> : <p>ㅤ</p>
            }
            </div>
            </div>
            <div className={estilos.Third}>
            <div className={errors.speed ? estilos.warning :estilos.DivInput}>
            {/* INPUT SPEED */}
            <label className={estilos.Label}>* Speed: <b className={estilos.aclaraciones}>(1 - 200)</b></label>
            <input className={estilos.InputForm} type="number" name="speed" value={input.speed}  onChange={handleChange} required></input>
            {
                errors.speed ? <p>{errors.speed}</p>: <p>ㅤ</p>
            }
            </div>
            <div className={errors.height ? estilos.warning :estilos.DivInput}>
            {/* INPUT HEIGHT */}
            <label className={estilos.Label}>* Height(cm): <b className={estilos.aclaraciones}>(1 - 100)</b></label>
            <input className={estilos.InputForm} type="number" name="height" value={input.height}  onChange={handleChange} required></input>
            {
                errors.height ? <p>{errors.height}</p> : <p>ㅤ</p>
            }
            </div>
            <div className={errors.weight ? estilos.warning :estilos.DivInput}>
            {/* INPUT WEIGTH */}
            <label className={estilos.Label}>* Weight(kg): <b className={estilos.aclaraciones}>(1 - 300)</b></label>
            <input className={estilos.InputForm} type="number" name="weight" value={input.weight}  onChange={handleChange} required></input>
            {
                errors.weight ? <p>{errors.weight}</p> : <p>ㅤ</p>
            }
            </div>
            </div>
            <div className={estilos.Four}>
            <div className={estilos.chooseSection}>
            <div className={errors.types ? estilos.warning :estilos.DivInput}>
            {/* INPUT TYPES */}
            <label className={estilos.Label}>* Choose a type: <b className={estilos.aclaraciones}>(ctrl + click)</b></label>
            <select className={estilos.SelectInput}
				id="types"
				name="types"
				multiple="multiple"
				onChange={(e) => hanldeChangeType(e)}>
				{
                    tipos.length ? tipos.map((t, i) => <option key={i} value={`${t}`}>{`${t}`}</option>) : false
                }
			</select>
            {
                errors.types ? <p className={estilos.errorType}>{errors.types}</p> : <p className={estilos.errorType}></p>
            }
            </div>
            </div>
            {/* INPUT IMAGE */}
            <div className={estilos.imageFormInput}>
             <label className={estilos.Label}>Image:</label>
            <input className={estilos.InputFormImage} type="text" name="image" value={input.image} placeholder="Please enter a .jpg or .png url..." onChange={handleChange}></input>
            </div>
            </div>
            <button type="submit" className={estilos.create}>CREATE</button>
            </form>
            </div>
            <div className={estilos.response}>
            {
                // muestra un boton para traer el pokemon junto al mensaje de que el mismo se creo
               pokemonName.nombre && <div className={estilos.responseCard}><h1>{`Pokémon ${pokemonName.nombre} creado con éxito!`}</h1><button onClick={handleGetPokemon} className={estilos.buttonGet}>{"GET POKÉMON"}</button></div>
            }
            {
                // muestra el pokemon creado
               creado && creado.name && <div className={estilos.responseCard}><Card key={creado.id * 100} {...creado}></Card> </div> 
            }
            </div>
            </div>
        </div>
        </>
    )
} 

// funcion validadora de los input del usuario
function validateInput(input){

    let errors = {};

    if(!input.name){
        errors.name = "The name is required.";
    }else if(!/^[A-Za-z0-9\s]+$/g.test(input.name)){
        errors.name = "Cannot contain special characters."
    }else if(input.name.length > 11){
        errors.name = "11 characters max."
    }
    
    if(!input.hp){
        errors.hp = "Health is required.";
    }else if(input.hp <= 0 || !/^[0-9]*$/g.test(input.hp)){
        errors.hp = "Min hp is 1.";
    }else if(input.hp > 100 || !/^[0-9]*$/g.test(input.hp)){
        errors.hp = "Max health is 100hp."
    }

    if(!input.attack){
        errors.attack = "Attack is required.";
    }else if(input.attack <= 0 || !/^[0-9]*$/g.test(input.attack)){
        errors.attack = "Min attack is 1.";
    }else if(input.attack > 300 || !/^[0-9]*$/g.test(input.attack)){
        errors.attack = "Max attack is 300."
    }

    if(!input.defense){
        errors.defense = "Defense is required.";
    }else if(input.defense <= 0 || !/^[0-9]*$/g.test(input.defense)){
        errors.defense = "Min defense is 1.";
    }else if(input.defense > 300 || !/^[0-9]*$/g.test(input.defense)){
        errors.defense = "Max defense is 300."
    }

    if(!input.speed){
        errors.speed = "Speed is required.";
    }else if(input.speed <= 0 || !/^[0-9]*$/g.test(input.speed)){
        errors.speed = "Min speed is 1.";
    }else if(input.speed > 200 || !/^[0-9]*$/g.test(input.speed)){
        errors.speed = "Max speed is 200."
    }

    if(!input.height){
        errors.height = "Height is required.";
    }else if(input.height <= 0 || !/^[0-9]*$/g.test(input.height)){
        errors.height = "Min height is 1.";
    }else if(input.height > 100 || !/^[0-9]*$/g.test(input.height)){
        errors.height = "Max height is 100."
    }

    if(!input.weight){
        errors.weight = "Weight is required.";
    }else if(input.weight <= 0 || !/^[0-9]*$/g.test(input.weight)){
        errors.weight = "Min weight is 1.";
    }else if(input.weight > 300 || !/^[0-9]*$/g.test(input.weight)){
        errors.weight = "Max weight is 300."
    }

    if(!input.types.length || input.types.length > 3 ){
        errors.types = "You must choose at least 1 type, but no more than 3"
    }
    return errors
}






