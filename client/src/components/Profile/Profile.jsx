import React, { useState } from "react";

import s from './Profile.module.scss';
import configLogo from './assets/configLogo.svg'
import plusLogo from './assets/PlusLogo.svg'
import rocket from './assets/Rocket.svg'

import Navbar from "../Navbar/Navbar";
import CardProfileMap from '../CardProfileMap/CardProfileMap.jsx'
import { getLocalStorage } from "../../handlers/localStorage";
import defaultimage from './assets/deafultimage.png'
import ProfessionBox from "../ProfessionBox/ProfessionBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PremiumModal from "./premiumModal/PremiumModal";



//ESTADO HARCODEADO PARA HACER PRUEBAS EN PROFILE
let activeUser = {
  name: "lionel test nuevo",
  last_Name: "messi",
  description: "hola mi nombre es lio messi trucho y esto es disney CHANNEL",
  mail: "test_user_8943112@testuser.com",
  dni: "83.332.125",
  image: "not image",
  phone: "1656158172",
  country: "Rusia",
  // postal_code: "1406",
  city: "Moscu",
  coordinate: ["421", "-22"],
  professions: [{ name: "extraterrestre" }, { name: "sovietico" }, { name: "militar" }, { name: "armamentista" }, { name: "electricista" }, { name: "gasista" }, { name: "programador" }],
  isPremium: false
}

const Profile = () => {
  
  const [modalActive, setModalActive] = useState(false)

  //let activeUser = getLocalStorage();
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
            <div className={s.profile_Img_container}>
              {activeUser.image ? <img src={activeUser.image} className={s.profile_Img} /> : <img src={defaultimage} className={s.profile_Img} />}
            </div>
            <div className={s.profileDetail}>
              <div className={s.name}>{activeUser.name} {activeUser.last_Name}</div>
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
              <img src={configLogo}></img>
              <div>Panel de configuración</div>
            </div>
          
        </div>


        {/*----- CONTENEDOR DERECHO -----*/}
        <div className={s.rightContainer}>
          <div className={s.professionContainer}>
            <p className={s.professionText}>Mis oficios publicados</p>
            <ProfessionBox professional={activeUser} />
            <div className={s.addProfession}>
              <div>
                <img src={plusLogo} alt='plus'></img>
              </div>
            </div>
          </div>
          <div className={s.bePremium}>
            {

            }
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
        </div>


      </div>
    </>
  )
}

export default Profile;
