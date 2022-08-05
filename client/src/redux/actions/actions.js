import axios from "axios"
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const LAST_CREATED = "LAST_CREATED";
export const CREATE_ONLY = "CREATE_ONLY";
export const API_ONLY = "API_ONLY";
export const GET_TYPES = "GET_TYPES";
export const ORDER_POKEMONS = "ORDER_POKEMONS";
export const CLEAN_FORM = "CLEAN_FORM";
export const CLEAN_DETAILS = "CLEAN_DETAILS";
export const ALL_POKEMONS = "ALL_POKEMONS";
export const UPDATE_POKEMON = "UPDATE_POKEMON";
export const UPDATE = "UPDATE";
// export const DELETE_POKEMON = "DELETE_POKEMON";



// ACCTION QUE TRAE TODOS LOS POKEMONS PARA REMPLAZARLOS Y NO ALTERARLOS NUNCA
export function getAllPokemons(){
    return async function(dispatch){
        try{
            const response = await axios.get(`/pokemons`)
            dispatch({
                type: ALL_POKEMONS,
                payload: response.data
            })
        }catch(error){
            console.log(error)
        }
    }
}


// ACTION QUE TRAE TODOS LOS POKEMONS PARA REMPLAZARLO
export function getPokemons(){
    return function(dispatch){
        return axios.get(`/pokemons`)
        .then(response => {
            dispatch({
                type: GET_POKEMONS,
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error)
        })
    }
}


// ACTION QUE TRAE UN POKEMON POR NOMBRE
export function getPokemonByName(name){
    return  function(dispatch){
        return axios.get(`/pokemons?name=${name}`) 
        .then(response => {
            dispatch({
                type: GET_POKEMON_BY_NAME,
                payload: response.data,
            })
        })
        .catch(error =>{
            alert(`${name} doesn´t exist!`)
        })
    }
}


// ACTION QUE TRAE UN POKEMON POR ID 
export const getById = (id) => {
    return async function(dispatch){
        return axios.get(`/pokemons/${id}`)
        .then( json  => {
            dispatch({
                type: GET_POKEMON_BY_ID,
                payload: json.data
            })
        })
    }
}


// ACTION QUE DESPACHA LA CREACION Y DEVULVE EL NOMBRE
export function createPokemon(payload){
    return function(dispatch){
        return axios.post(`/pokemons`, payload)
        .then(response => {
            dispatch({
                type: CREATE_POKEMON,
                payload: response.data
            })
        })
        .catch(error =>{
            alert(error.message)
        })
       
    }
}

// ACTION QUE DESPACHA LA BUSQUEDA DEL POKEMON EN BASE AL NOMBRE DE LA ACTION ANTERIOR
export function getLasCreated(name){
    return  function(dispatch){
        return axios.get(`/pokemons?name=${name}`) 
        .then(response => {
            dispatch({
                type: LAST_CREATED,
                payload: response.data,
            })
        })
        .catch(error =>{
            alert(error.message)
        })
    }
}


// ACTION QUE DESPACHA LA ACTION PARA TRAER TODOS LOS POKEMONS PARA DSPS FILTRARLOS POR LOS DE LA DB
export function getPokemonsCreated(){
    return function(dispatch){
        return axios.get(`/pokemons`)
        .then(response => {
            dispatch({
                type: CREATE_ONLY,
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error)
        })
    }
}


// ACTION QUE DESPACHA LA ACTION PARA TRAER TODOS LOS POKEMONS PARA DSPS FILTRARLOS POR LOS DE LA API
export function getPokemonsAPI(){
    return function(dispatch){
        return axios.get(`/pokemons`)
        .then(response => {
            dispatch({
                type: API_ONLY,
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error)
        })
    }
}


// ACTION QUE DESPACHA LA BUSQUEDA DE TODOS LOS TIPOS DE POKEMONS
export function getTypes(){
    return function(dispatch){
        return axios.get(`/types`)
        .then(response => {
            dispatch({
                type: GET_TYPES,
                payload: response.data
            })
        }, (error) => {
            console.log(error)
        })
    }
}

// export function sortPokemons(arr){
//     return async function(dispatch){
//        dispatch({
//         type: ORDER_POKEMONS,
//         payload : arr,
//        })
//     }
// }


// ACTION QUE DESPACHA EL TIPO DE FILTRADO QUE SE VA A HACER Y EL 
// TIPO DE POKEMON EN CASO DE QUE SE TRATE DE UN FILTRADO POR TIPO
export function sortPokemons(code, tipo){
    return async function(dispatch){
       dispatch({
        type: ORDER_POKEMONS,
        payload : {code, tipo}
       })
    }
}


// ACTION QUE DESPACHA LA LIMPIEZA DEL FORMULARIO
export function cleanForm(){
    return async function(dispatch){
       dispatch({
        type: CLEAN_FORM,
        payload : {},
       })
    }
}


// ACTION QUE DESPACHA LA LIMPIEZA DE LOS DETALLES
export function cleanDetails(){
    return function(dispatch){
        dispatch({
            type: CLEAN_DETAILS,
            payload: [],
        })
    }
}


// ACTION QUE ACTUALIZA LA PAGINA EN LA QUE SE ENCUENTRA EL USER
export function updatePage(page){
    return function(dispatch){
        dispatch({
            type: UPDATE,
            payload: page,
        })
    }
}

// export function deletePokemon(id){
//     return (dispatch) => {
//         return axios.delete("/pokemons")
//         .then(res => {
//             dispatch({
//                 type: DELETE, 
//                 payload: res.data
//             })
//         })
//     }
// }


// ACTION QUE ACTUALIZA UN POKEMON CREADO
// export function updatePokemon(...args){
//     return function(dispatch){
//         return axios.put("/pokemons", {...args})
//         .then(res => {
//             dispatch({
//                 type: UPDATE_POKEMON,
//                 payload: res.data
//             })
//         })
//     }
// }


