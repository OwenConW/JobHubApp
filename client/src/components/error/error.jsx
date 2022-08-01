import React, { Component} from "react"
import estilos from "../../estilos/error/error.module.css"
import { Link } from "react-router-dom"

export class error extends Component{
    
    render(){
        return(
            <div className={estilos.padre}>
           <div className={estilos.noise}></div>
            <div className={estilos.overlay}></div>
            <div className={estilos.terminal}>
            <h1>Error <span className={estilos.errorcode}>404</span></h1>
            <p className={estilos.output}>The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
            <br></br>
            <p className={estilos.output}>Please try to <Link to="/">go landing page</Link>.</p>
            <br></br>
            <p className={estilos.output}>Good Hack.</p>
            </div>
        </div>
        )
    }
}