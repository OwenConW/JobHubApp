import React from "react"
import "./FormReturn.css"
import * as functions from "../../handlers/localStorage"
import axios from "axios"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

export default function FormReturn(){
    
    const user = functions.getLocalStorage()    
    const [loading, setLoading] = React.useState(null)
    const [seconds, setSeconds] = React.useState(6)
    const [reset, setReset] = React.useState(null)
    const navigate = useNavigate();

    const checkeds = document.getElementsByName("obligatorio")

    const handleSubmit = (e) => {
        if(!checkeds[0].checked || !checkeds[1].checked || !checkeds[2].checked || !checkeds[3].checked){
            Swal.fire({
                icon: 'error',
                title: 'Oh no...',
                html:'<h2>Debes aceptar todos los requerimientos antes de recuperar tu cuenta!</h2>',
                width: 600,
                padding: '3em',
                color: '#dfdddd',
                background: '#2C666E',
                backdrop: `
                rgba(172,172,172,0.5424720913756127)`,
                confirmButtonColor: '#e36f6f',
                confirmButtonText: "Volver"
            })
              
        }else{
            Swal.fire({
                icon: "success",
                title: "Lo haremos!",
                html: '<h2>Intentando recuperar tus datos!</h2>',
                width: 600,
                padding: '3em',
                color:'#dfdddd',
                background: '#2C666E',
                backdrop: `
                rgba(172,172,172,0.5424720913756127)`,
            })
            setLoading(true)
            setSeconds(seconds -1)
        }
    }

    React.useEffect(() => {
        setTimeout(() => {
            if(seconds === 0){
                setLoading(null)
                setSeconds(6)
                axios.get(`/verify?mail=${user.mail}`)
                .then(res => {
                    setReset(res.data)
                })
            }else if(seconds !== 6){
                setSeconds(seconds -  1)
            }
        }, 1000);
    }, [loading, seconds])


    React.useEffect(() => {
        if(reset?.onboarding){
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos :(',
                html:'<h2>No ha sido posible recuperar tus datos, porfavor vuelve a registrarte</h2>',
                width: 600,
                heigh: 400,
                padding: '3em',
                color: '#dfdddd',
                background: '#2C666E',
                backdrop: `
                rgba(172,172,172,0.5424720913756127)`
            })
            navigate("/onboarding")
        }else if(reset?.onboarding === false){
            Swal.fire({
                icon: 'success',
                title: `Bienvenido de vuelta ${reset?.user.name}`,
                html: '<h2>Porfavor no vuelvas a abandonarnos</h2>',
                width: 600,
                heigh: 400,
                padding: '3em',
                color: '#dfdddd',
                background: '#2C666E',
                backdrop: `
                rgba(172,172,172,0.5424720913756127)`
              })
            functions.setUserLocalStorage(reset?.user)
            axios.put(`/destroy/${reset?.user.id}`, {isActive: true})
            navigate("/home")
        }
    }, [reset])

    return(
        <>
        <div className="contenedor">
            <div className="title">
                <h1>{`Bienvenido devuelta ${user?.mail}! `}<br></br>¿Estas pensando en reactivar tu cuenta?</h1>
            </div>
            <div>
                <h2 className="remember">Te recordamos que lamentablemente has desactivado tu cuenta...</h2>
            </div>
            <div className="contenedorLista">
                <ul className="options">
                    <li>
                 <label className="content-input">
                 <input type="checkbox" name="obligatorio" id="force1"/> Al marcar esta casilla aceptas que si no se logran recuperar los datos deberas crear todo de nuevo.
                 <i></i>
                 </label>
                    </li>
                    <li>
                 <label className="content-input">
                 <input type="checkbox" name="obligatorio" id="force2"/> Al marcar esta casilla aceptas continuar desde el punto en que diste de baja tu cuenta.
                 <i></i>
                 </label>
                    </li>
                    <li>
                 <label className="content-input">
                 <input type="checkbox" name="obligatorio" id="force3"/> Al marcar esta casilla entiendes que el equipo de JobHub hara lo posible por recuperar tus datos.
                 <i></i>
                 </label>
                    </li>
                    <li>
                 <label className="content-input">
                 <input type="checkbox" name="obligatorio" id="force4"/> Al marcar esta casilla aceptas reactivar tu cuenta.
                 <i></i>
                 </label>
                    </li>
                </ul>
            </div>
            {
                loading ? (
                    <>
                        <h1 className="loading">{`Cargando... Por favor aguarda ${seconds}s`}</h1>
                    </>
                ) : (
                <div className="contenedorBoton" onClick={handleSubmit}>
                    <p>Enviar</p>
                </div>
                )
            }
        </div>
        </>
    )
}