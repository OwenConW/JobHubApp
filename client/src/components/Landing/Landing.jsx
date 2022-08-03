import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import { getPokemons, getTypes, getAllPokemons } from "../../redux/actions/actions.js"
import estilos from "../../estilos/Landing/Landing.module.css"

export class Landing extends Component{
    componentDidMount(){
        this.props.getPokemons()
        this.props.getTypes()
        this.props.getAllPokemons()
    }
    render(){
        return(
            <div className={estilos.landing}>
                {
                    this.props.pokemons.length >= 40
                    ? <Link to="/home"><div className={estilos.button}></div></Link> 
                    : <div className={estilos.contenedor}><span className={estilos.loader}></span><h3 className={estilos.loading}>Loading...</h3></div>
                }
            </div>
        )
    }
}
//<Link to="/home"><button>GO HOME</button></Link>
const mapStateToProps = (state) => {
    return{
        pokemons: state.pokemons,
        tipos: state.types
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        getPokemons: () => dispatch(getPokemons()),
        getTypes: () => dispatch(getTypes()),
        getAllPokemons: () => dispatch(getAllPokemons())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)