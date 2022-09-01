import React from "react";
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import s from './ProfileConfig.module.scss';


import Navbar from "../Navbar/Navbar";
import { getLocalStorage } from "../../handlers/localStorage";
import axios from "axios";
import ConfigPages from "./ConfigComponents/ConfigPages";
import { useDispatch } from "react-redux";
import { getChars, getCharsById } from "../../redux/userActions";
import { actionGetAllReviews } from "../../redux/reviewActions";
import { actionGetAllJobs } from "../../redux/jobActions";
import { actionGetAllOrders } from "../../redux/orderActions";



const ProfileConfig = () => {
  const dispatch = useDispatch()
  //tomo los datos del usuario
  let activeUser = getLocalStorage();

  useEffect(()=>{
    dispatch(getChars())
    dispatch(getCharsById(activeUser.id))
    dispatch(actionGetAllReviews())
    dispatch(actionGetAllJobs())
    dispatch(actionGetAllOrders(activeUser.id))
  }, [])

  

  // id para conditional render
  let params = useParams();
  let id = params.id;

  const [configPage, setConfigPage] = useState(id)

  const paginado = (event) => {
    console.log(event.target.name)
    setConfigPage(event.target.name)
  }

  useEffect(() => {
    dispatch(getChars())
    dispatch(actionGetAllReviews())
  }, [configPage])


  
  return (
    <>
      <Navbar />
      <div className={s.outerContainer}>
        <div className={s.innerContainer}>

          {/*----- CONTENEDOR IZQUIERDO -----*/}
          <div className={s.leftContainer}>
            <button to='edit' className={configPage === "edit" ? s.activeOptionList : s.optionList} name='edit' onClick={paginado}>
              Editar perfil
            </button>
            {/* <button className={s.optionList} name='password' onClick={paginado}>
              Cambiar contraseña
            </button> */}
            {/* <button className={s.optionList} name='notifications' onClick={paginado}>
              Notificaciones por correo
            </button> */}
            <button className={configPage === "orders" ? s.activeOptionList : s.optionList} name='orders' onClick={paginado}>
              Mis Ordenes
            </button>
            <button className={configPage === "opinions" ? s.activeOptionList : s.optionList} name='opinions' onClick={paginado}>
              Mis Opiniones
            </button>
            {
              activeUser.isProfessional ?
                <button className={configPage === "professions" ? s.activeOptionList : s.optionList} name='professions' onClick={paginado}>
                  Profesiones
                </button> : <></>
            }
            {
              activeUser.isProfessional ?
                <button className={configPage === "otherReviews" ? s.activeOptionList : s.optionList} name='otherReviews' onClick={paginado}>
                  Mis Reseñas
                </button> : <></>
            }
            {/* {
              activeUser.isProfessional ?
                <button className={s.optionList} name='premium' onClick={paginado}>
                  Premium
                </button> : <></>
            } */}
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