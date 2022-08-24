import React from "react";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

import s from './ProfileConfig.module.scss';


import Navbar from "../Navbar/Navbar";
import { getLocalStorage } from "../../handlers/localStorage";
import axios from "axios";
import ConfigPages from "./ConfigComponents/ConfigPages";



const ProfileConfig = () => {
  let activeUser = getLocalStorage();

  const [configPage, setConfigPage] = useState('edit')

  const paginado = (event) => {
    setConfigPage(event.target.name)
  }

  useEffect((event) => {
    // console.log('localStorage: ', activeUser)
    // console.log('configpage: ', configPage)

  }, [configPage])

  return (
    <>
      <Navbar />

      <div className={s.outerContainer}>
        <div className={s.innerContainer}>

          {/*----- CONTENEDOR IZQUIERDO -----*/}
          <div className={s.leftContainer}>
            <button to='edit' className={s.optionList} name='edit' onClick={paginado}>
              Editar perfil
            </button>
            {/* <button className={s.optionList} name='password' onClick={paginado}>
              Cambiar contraseña
            </button> */}
            <button className={s.optionList} name='notifications' onClick={paginado}>
              Notificaciones por correo
            </button>
            {
              activeUser.isProfessional ?
                <button className={s.optionList} name='professions' onClick={paginado}>
                  Profesiones
                </button> : <></>
            }
            {
              activeUser.isProfessional ?
                <button className={s.optionList} name='premium' onClick={paginado}>
                  Premium
                </button> : <></>
            }

          </div>


          {/*----- CONTENEDOR DERECHO -----*/}
          <div className={s.rightContainer}>
            <ConfigPages configPage={configPage} />
          </div>

        </div>
      </div>
    </>
  )
}

export default ProfileConfig