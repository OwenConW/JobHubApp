import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { getLocalStorage } from '../../handlers/localStorage';
import axios from 'axios';

import s from './scss/Support.module.scss';

function validate(msgSupport) {
  let errors = {};
  if (msgSupport.subject.length === 0) {
    errors.subject = "Por favor seleccione un asunto";
  } 
  if (!msgSupport.description) {
    errors.description = "Por favor déjenos una descripción de su consulta";  
  } 
  return errors;
}

var asuntos = [
  "Quiero agregar un oficio que no está",
  "Quiero restablecer mi cuenta de JobHub",
  "Otro asunto"
];

var asuntos2 = [
  "Quiero agregar un oficio que no está",
  "Quiero reportar a un usuario",
  "Quiero restablecer mi cuenta de JobHub",
  "Otro asunto"
];

const Support = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const userIDreported = navigate().location.state || "";
  const [errors, setError] = useState({})
  const id = getLocalStorage().id;
  const name = getLocalStorage().name;
  const last_name = getLocalStorage().last_name;
  const [msgSupport, setMsgSupport] = useStateWithCallbackLazy({
    userID: id ? id :  "000",
    name: name ? name : "",
    last_Name: last_name ? last_name : "",
    // userIDreported: userIDreported && userIDreported.id || "",
    subject: "",
    description: ""
  })

  function handleChange(e) {
    e.preventDefault()
    setMsgSupport({
      ...msgSupport,
      [e.target.name]: e.target.value
    })
  }

  function handleSelect(e) {
    e.preventDefault()
    if(asuntos.includes(e.target.value) && e.target.value !== 'vacio') {
      setMsgSupport({
        ...msgSupport,
        subject: e.target.value
      })
    }
  }  
  
  function handleSubmit(e) {
    if(msgSupport.subject === "" || msgSupport.description === "") {
      setError(                          
        validate({
          ...msgSupport,
          [e.target.name]: e.target.value  
        })
      )
    } else {
      e.preventDefault()
      alert('Gracias, hemos recibido su problema!')
      setMsgSupport({
        userID: "",
        name: "",
        last_Name: "",
        // userIDreported: "",                          
        subject: [],
        description: ""
      })
      navigate("../home", { replace: true });
    }  
    e.preventDefault()
  }

  return (
    <>
      <div className={s.container}>
        <div className={s.component}>
          <form className={s.form}  onSubmit={(e) => handleSubmit(e)}>
            <Link to='/home'><button className={s.button}>Volver al Inicio</button></Link>
            <div className={s.contain}>
              <h1 id={s.title}>ENVÍANOS TU CONSULTA</h1>
              <h2 id={s.subtitle}>Un admin se contactará contigo en la brevedad... </h2>
              <h2 id={s.select}>Selecciona el asunto de tu problema:</h2>
              <select className={s.subjects} value={msgSupport.subject} onChange={(e) => handleSelect(e)}>
                <option hidden selected value='vacio'>Elige un asunto...</option>
                {asuntos?.map( a => {
                  return (<option key={a} value={a}>{a}</option>)
                })}
              </select>
              {errors.subject && <p className={s.err}>{errors.subject}</p>}
            </div>
            <div className={s.contain2}>
              <h2>Descripción:</h2>
              <textarea className={s.description}
                type="text"
                value={msgSupport.description}
                name="description"
                onChange={(e) => handleChange(e)}
              />
              {errors.description && <p className={s.err}>{errors.description}</p>}
            </div>
            <button className={s.buttonCreate} type="submit">Enviar</button>
          </form>    
        </div>
      </div>
    </>
  );
};

export default Support;
