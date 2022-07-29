import {CREATE_POKEMON, GET_POKEMONS, GET_POKEMON_BY_NAME, GET_TYPES, ORDER_POKEMONS, GET_POKEMON_BY_ID, CREATE_ONLY, LAST_CREATED, API_ONLY, CLEAN_FORM, CLEAN_DETAILS, /*DELETE_POKEMON, UPDATE_POKEMON*/} from "../actions/actions.js"

const initialState = {
    pokemons: [],
    types: [],
    pokemonC: {},
    pokemonForm: {},
    pokemonbyname: {}
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
                pokemonForm: action.payload,
            }
        case CREATE_ONLY:
            return{
                ...state,
                pokemons: [...action.payload.slice(40)]
            }
        case API_ONLY:
            return{
                ...state,
                pokemons: [...action.payload.slice(0, 39)]
            }
        case GET_TYPES:
            return{
                ...state,
                types: action.payload
            }
        case ORDER_POKEMONS:
            return{
                ...state,
                pokemons: [...action.payload]
            }
        case CLEAN_FORM:
            return{
                ...state,
                pokemonC: action.payload,
                pokemonForm: action.payload
            }
        case CLEAN_DETAILS:
            return{
                ...state,
                pokemonbyname: action.payload
            }
        // case UPDATE_POKEMON:
        //     return{
        //         ...state,
        //         pokemonForm: action.payload
        //     }
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