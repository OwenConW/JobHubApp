import {CREATE_POKEMON, GET_POKEMONS, GET_POKEMON_BY_NAME, GET_TYPES, ORDER_POKEMONS, GET_POKEMON_BY_ID, CREATE_ONLY, LAST_CREATED, API_ONLY, CLEAN_FORM, CLEAN_DETAILS, /*DELETE_POKEMON,*/ UPDATE_POKEMON} from "../actions/actions.js"
import * as sorts from "../../components/Filters-Orders/Filter.js"
const initialState = {
    pokemons: [],
    types: [],
    pokemonC: {},
    pokemonbyname: {},
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_POKEMONS:
            return{
                ...state,
                pokemons: [...action.payload]
            }
        case GET_POKEMON_BY_NAME:
            return{
                ...state,
                pokemons: action.payload,
            }
        case GET_POKEMON_BY_ID:
            return{
                ...state,
                pokemonbyname: action.payload   
            }
        case CREATE_POKEMON:
            return{
                ...state,
                pokemonC: action.payload,
            }
        case LAST_CREATED:
            return{
                ...state,
                pokemonbyname: action.payload,
            }
        case CREATE_ONLY:
            return{
                ...state,
                pokemons: sorts.filterByDb(action.payload)
            }
        case API_ONLY:
            return{
                ...state,
                pokemons: sorts.filterByApi(action.payload)
            }
        case GET_TYPES:
            return{
                ...state,
                types: action.payload
            }
        case ORDER_POKEMONS:
            let change;
            if(action.payload.code === "filter"){
                change = sorts.filterByType(action.payload.tipo, state.pokemons)
            }
            if(action.payload.code === "AZ"){
               change = sorts.orderA_z(state.pokemons)
            }
            if(action.payload.code === "ZA"){
                change = sorts.orderZ_a(state.pokemons)
            }
            if(action.payload.code === "MIN_MAX"){
                change = sorts.orderMin_MaxAttack(state.pokemons)
            }
            if(action.payload.code === "MAX_MIN"){
                change = sorts.orderMax_MinAttack(state.pokemons)
            }
            return{
                ...state,
                pokemons: [...change]
            }
            // return{
            //     ...state,
            //     pokemons: [...action.payload]
            // }
        case CLEAN_FORM:
            return{
                ...state,
                pokemonC: action.payload,
                pokemonbyname: action.payload
            }
        case CLEAN_DETAILS:
            return{
                ...state,
                pokemonbyname: action.payload
            }
        case UPDATE_POKEMON:
            return{
                ...state,
                pokemonForm: action.payload
            }
        // case DELETE_POKEMON:
        //     console.log("REDUCER:", action.payload)
        //     return{
        //         ...state,
        //         pokemons: action.payload
        //     }
        default:
            return state;
    }
}

export default rootReducer;