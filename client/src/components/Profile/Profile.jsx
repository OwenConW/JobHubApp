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
import { getCharsById } from "../../redux/userActions";
import { useEffect } from "react";
import corona from "./assets/corona.png"
import rocketP from "./assets/RocketP.png"
import Swal from "sweetalert2"

const Profile = () => {
  //success?preapproval_id=x
  const navigate = useNavigate()
  const currentUser = functions.getLocalStorage()
  const search = useLocation().search;
  const preapproval_id = new URLSearchParams(search).get('preapproval_id');

  if(preapproval_id){
    axios.put(`users/premium/${currentUser.id}`, {isPremium: true, idPago: preapproval_id})
    .then(() => {
      Swal.fire({
        icon: 'success',
        html: `<h1>Muchas gracias por formar parte de la familia Job Hub</h1>
        <h3>Tu id de compra para reclamos es ${preapproval_id}</h3>
         <h2>Porfavor recarga la página</h2>`,
        width: 700,
        padding: '3em',
        color: '#dfdddd',
        background: '#2C666E',
        backdrop: `
          rgba(0,0,123,0.4)
          url("./assets/confetti2.gif")
        `
      })
      .then(() => {
        axios.get(`/users/${currentUser.id}`)
        Swal.close(navigate("/profile"))
      })
    })
  }


  const [modalActive, setModalActive] = useState(false)
  let myUser = getLocalStorage();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getCharsById(myUser.id))
  }, [])

  const activeUser = useSelector((state) => state.users.detail);



  const handlePremiumModal = async () => {
  setModalActive(!modalActive)
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
              currentUser.isPremium ? (
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
                currentUser.isPremium ? <div className={s.name}><img src={corona} alt="" className={s.corona}/>{activeUser.name} {activeUser.last_Name}</div>
                : <div className={s.name}>{activeUser.name} {activeUser.last_Name}</div>
              }
              
              <div className={s.location}>{activeUser.city}, {activeUser.country}</div>
              <div className={s.description}>{activeUser.description}</div>
            </div>

          </div>
          <div className={s.orderBox}>
            <p className={s.orderText}>Mis ordenes recientes</p>

            <div className={s.lastOrders}>
              <CardProfileMap />
              <CardProfileMap />
              <CardProfileMap />
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
            <ProfessionBox professional={activeUser} />
            <div className={s.addProfession}>
              <Link to='/ProfileConfig/professions'>
                <div>
                  <img src={plusLogo} alt='plus'></img>
                </div>
              </Link>
            </div>
          </div>
          {
            activeUser.isPremium ? (
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
