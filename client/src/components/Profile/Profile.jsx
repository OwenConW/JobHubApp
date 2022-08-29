import React, { useState } from "react";

import { Link, useLocation, useNavigate} from 'react-router-dom';

import s from './Profile.module.scss';
import configLogo from './assets/configLogo.svg'
import plusLogo from './assets/PlusLogo.svg'
import rocket from './assets/Rocket.svg'
import Navbar from "../Navbar/Navbar";
import CardProfileMap from '../CardProfileMap/CardProfileMap.jsx'
import { getLocalStorage } from "../../handlers/localStorage";
import ProfessionBox from "../ProfessionBox/ProfessionBox";
import PremiumModal from "./premiumModal/PremiumModal";
import * as functions from "../../handlers/localStorage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getChars, getCharsById } from "../../redux/userActions";
import { useEffect } from "react";
import { actionGetAllOrders } from "../../redux/orderActions";
import corona from "./assets/corona.png"
import rocketP from "./assets/RocketP.png"
import Swal from "sweetalert2"
import { setUserLocalStorage } from "../../handlers/localStorage"


const Profile = () => {
  //success?preapproval_id=x
  const navigate = useNavigate()
  const currentUser = functions.getLocalStorage()
  const search = useLocation().search;
  const preapproval_id = new URLSearchParams(search).get('preapproval_id');

  const activeUser = useSelector((state) => state.users.detail);
  let allOrders = useSelector((state) => state.orders.orders)

  if(preapproval_id){
    axios.put(`users/premium/${currentUser.id}`, {isPremium: true, idPago: preapproval_id})
    .then(() => {
      Swal.fire({
        icon: 'success',
        html: `<h1>Muchas gracias por formar parte de la familia Job Hub</h1>
        <h3>Tu id de compra para reclamos es: <h2 style="font-weight: 800">${preapproval_id}</h2></h3>
        <br></br>
        <h2>Recorda que tendras todo acerca de tu suscripcion en el panel de configuracion</h2>`,
        width: 700,
        padding: '3em',
        color: '#dfdddd',
        background: '#2C666E',
        backdrop: `
        rgba(172,172,172,0.5424720913756127)
 
        url("https://cutewallpaper.org/24/transparent-animated-gifs/confetti-in-gif-format-55-animated-images-for-free.gif")
        `
      })
      .then(() => {
        Swal.close(navigate("/profile"))
        axios.get(`/users/${currentUser.id}`)
        .then(res => {
          setUserLocalStorage(res.data)
          window.location.reload()
          axios.get(`/mails/bienvenido/premium?name=${currentUser.name}&mail=${currentUser.mail}`)
        })
      })
    })
    .catch(e => {
      console.log(e)
    }) 
  }


  const [modalActive, setModalActive] = useState(false)
  let myUser = getLocalStorage();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getChars())
    dispatch(getCharsById(myUser.id))
    dispatch(actionGetAllOrders(currentUser.id))
  }, [])

 



  const handlePremiumModal = async () => {
  setModalActive(!modalActive)
  }
  if(allOrders.length > 4){
    allOrders = allOrders.slice(0,3)
  }

  return (
    <>
      <Navbar />
      {modalActive ? <PremiumModal name={activeUser.name} mail={activeUser.mail} handlePremiumModal={handlePremiumModal} /> : null}
      {/*----- CONTENEDOR IZQUIERDO -----*/}
      <div className={s.container}>
        <div className={s.leftContainer}>
          <div className={s.profileInfo}>
            {
              activeUser?.isPremium ? (
                <div className={s.profile_Img_containerPremium}>
              <img src={activeUser.image} className={s.profile_ImgPremium} alt=""></img>
            </div>
              ): (
                <div className={s.profile_Img_container}>
                <img src={activeUser.image} className={s.profile_Img} alt=""></img>
              </div>
              )
            }
           
            <div className={s.profileDetail}>
              {
                activeUser?.isPremium ? <div className={s.name}><img src={corona} alt="" className={s.corona}/>{activeUser.name} {activeUser.last_Name}</div>
                : <div className={s.name}>{activeUser.name} {activeUser.last_Name}</div>
              }
              
              <div className={s.location}>{activeUser.city}, {activeUser.country}</div>
              <div className={s.description}>{activeUser.description}</div>
            </div>

          </div>
          <div className={s.orderBox}>
            <p className={s.orderText}>Mis ordenes recientes</p>

            <div className={s.lastOrders}>
              {
                
               allOrders ? 
               allOrders.map(order => <CardProfileMap order={order}/>) : <></>
              }
            </div>
          </div>
          <div className={s.configBox}>
            <div className={s.configImg}>
              <Link to='/ProfileConfig/edit'>
                <img src={configLogo} ></img>
              </Link>
            </div>
            <Link to='/ProfileConfig/edit' className={s.configText}>Panel de configuración</Link>
          </div>

        </div>


        {/*----- CONTENEDOR DERECHO -----*/}
        <div className={s.rightContainer}>
          <div className={s.professionContainer}>
            <p className={s.professionText}>Mis oficios publicados</p>
            
            {
              activeUser?.isProfessional ?  <>          
               <ProfessionBox professional={activeUser} />
            <div className={s.addProfession}>
              <Link to='/ProfileConfig/professions'>
                <div>
                  <img src={plusLogo} alt='plus'></img>
                </div>
              </Link>
            </div>
              </>: 
              <div className={s.noProfessional}><Link to='/ProfileConfig/edit' className={s.intNoProf}>Convertite en Profesional</Link></div>
            }
  
          </div>
          {
            activeUser?.isPremium ? (
              <div className={s.isPremiumTRUE}>

              <div className={s.premiumTextTRUE}>
                <h1>Premium Activo</h1>
                <div className={s.premiumDetailTRUE}>
                  <h4>Usted posee todos los beneficios del plan premium.
                      Estamos muy contentos y agredecidos de que formes parte de la familia Job Hub y 
                      aporte a que sigamos creciendo.
                  </h4>
                </div>
  
              </div>
  
              <div className={s.premiumRocketButtonTRUE}>
                <div>
                  <img className={s.rocketsito} src={rocketP} alt='Premium Logo'></img>
                </div>
              </div>
            </div>
              ) : (
                <div className={s.bePremium}>

                <div className={s.premiumText}>
                  <h1>Plan Premium</h1>
                  <div className={s.premiumDetail}>
                    <h4>Obtenga los beneficios del plan premium:
                      mas visibilidad, opciones y recomendacion por parte de la aplicacion
                      para que tenga una mayor cantidad de clientes y despegue al proximo nivel
                    </h4>
                  </div>
    
                </div>
    
                <div className={s.premiumRocketButton}>
                  <div>
                    <img src={rocket} alt='Premium Logo'></img>
                  </div>
                  <span onClick={handlePremiumModal}>
                    <button>Mejorar</button>
                  </span>
                </div>
              </div>
              )
          }
        </div>

      </div>
    </>
  )
}

export default Profile;
