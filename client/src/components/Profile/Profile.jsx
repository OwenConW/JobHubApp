import React from "react";

import s from './Profile.module.scss';
import userImg from './assets/userimage.jpg'
import configLogo from './assets/configLogo.svg'
import plusLogo from './assets/PlusLogo.svg'
import rocket from './assets/Rocket.svg'

import Navbar from "../Navbar/Navbar";
import CardProfileMap from '../CardProfileMap/CardProfileMap.jsx'
import ProfessionBox from "../ProfessionBox/ProfessionBox";
import { getLocalStorage } from "../localStorage";


//ESTADO HARCODEADO PARA HACER PRUEBAS EN PROFILE
let activeUser = {
  name: "lionel test nuevo",
  last_Name: "messi",
  description: "hola mi nombre es lio messi trucho y esto es disney CHANNEL",
  mail: "test2@gmail.com",
  dni: "83.332.125",
  image: "not image",
  phone: "1656158172",
  country: "Rusia",
  // postal_code: "1406",
  city: "Moscu",
  coordinate: ["421", "-22"],
  professions : [{name:"extraterrestre"}, {name:"sovietico"}, {name:"militar"}, {name:"armamentista"}, {name:"electricista"}, {name:"gasista"}, {name:"programador"}]
}

const Profile = () => {


// let activeUser = getLocalStorage();
      console.log('activeUser:  ', activeUser)
  return (
    <>
    <Navbar />
    {/*----- CONTENEDOR IZQUIERDO -----*/}
    <div className={s.container}>
      <div className={s.leftContainer}>
        <div className={s.profileInfo}>
          <div className={s.profile_Img_container}>
            <img src={userImg} className={s.profile_Img} />
          </div>
          <div className={s.profileDetail}>
            <div className={s.name}>{activeUser.name} {activeUser.last_Name}</div>
            <div className={s.location}>{activeUser.city}, {activeUser.country}</div>
            <div className={s.description}>Descripcion que quiera poner la persona a su perfil, quizas habria que agregarlo en la parte de db como parte del usuario </div>
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
            <ProfessionBox professional={activeUser}/>
            <div className={s.addProfession}>
              <div>
                <img src={plusLogo} alt='plus'></img>
              </div>
            </div>
          </div>
          <div className={s.bePremium}>
            <div className={s.premiumText}>
              <h1>Plan Premium</h1>
              <h4>Obtenga los beneficios del plan premium:
                mas visibilidad, opciones y recomendacion por parte de la aplicacion
                para que tenga una mayor cantidad de clientes y despegue al proximo nivel
              </h4>
            </div>

            <div className={s.premiumRocketButton}>
              <div>
                <img src={rocket} alt='Premium Logo'></img>
              </div>
              <span>
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