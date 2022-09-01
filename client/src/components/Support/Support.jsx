import React, { useState, useEffect } from "react";
import { Link, useNavigate, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { getLocalStorage } from '../../handlers/localStorage';
import axios from 'axios';

import s from './scss/Support.module.scss';

function validate(input) {
  let errors = {};
  if (!input.subject) {
    errors.subject = "Por favor seleccione un asunto";
  } else if (!input.description) {
    errors.description = "Por favor déjenos una descripción de su problema";  
  } 
  return errors;
}

var asuntos = [
  "Quiero agregar un oficio que no está",
  "Quiero reportar a un usuario"
];

const Support = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userIDreported = useHistory().location.state
  const [errors, setError] = useState({})
  const id = getLocalStorage().id;
  const name = getLocalStorage().name;
  const last_name = getLocalStorage().last_name;
  const [msgSupport, setMsgSupport] = useStateWithCallbackLazy({
    userID: id ? id :  "000",
    name: name ? name : "",
    last_Name: last_name ? last_name : "",
    // userIDreported: userIDreported ? userIDreported.id : "",
    subject: userIDreported ? asuntos[1] : "",
    description: ""
  })
  
  function handleSubmit(e) {  
    if(Object.keys(errors).length === 0) { 
      e.preventDefault()
      alert('Gracias, hemos recibido su problema!')
      setMsgSupport({
        userID: "",
        name: "",
        last_Name: "",
        // userIDreported: "",                          
        subject: "",
        description: "",
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
            <div>
              <h1 id={s.title}>ENVÍANOS TU PROBLEMA</h1>
              <h2 id={s.subtitle}>Un admin se contactará contigo en la brevedad... </h2>
            </div>
            <h3>Selecciona el asunto de tu problema:</h3>
            <select className={s.subjects}>
              <option hidden selected value='vacio'>Elige un asunto...</option>
              {asuntos?.map((a, index) => (
                 <option key={index} value={a}>{a}</option>
              ))}
            </select>
            {errors.subject && <p className={s.err}> {s.subject}</p>}
            <div>
              <h2>Descripción:</h2>
              <textarea className={s.description}
                type="text"
                // value={input.description}
                required
                name="description"
                // onChange={(e) => handleChange(e)}
              />
              {errors.description && <p className={s.err}> {errors.description}</p>}
            </div>
            <button className={s.buttonCreate} type="submit">Enviar</button>
          </form>    
        </div>
      </div>
    </>
  );
};

export default Support;
