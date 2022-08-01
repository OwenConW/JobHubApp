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
export const DELETE_POKEMON = "DELETE_POKEMON";
export const UPDATE_POKEMON = "UPDATE_POKEMON";


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

export function sortPokemons(arr){
    return async function(dispatch){
       dispatch({
        type: ORDER_POKEMONS,
        payload : arr,
       })
    }
}


export function cleanForm(){
    return async function(dispatch){
       dispatch({
        type: CLEAN_FORM,
        payload : {},
       })
    }
}

export function cleanDetails(){
    return function(dispatch){
        dispatch({
            type: CLEAN_DETAILS,
            payload: [],
        })
    }
}



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


// export function deletePokemon(name, id){
//     return function(dispatch){
//         axios.delete(`/pokemons?id=${id}`)
//         .then(res => {
//             console.log("ACTION CREATER:", res.data)
//             dispatch({
//                 type: DELETE_POKEMON,
//                 payload: res.data
//             })
//         })               
//     }
// }