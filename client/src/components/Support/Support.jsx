import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
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

  const navigate = useNavigate();
  const location = useLocation();
  var userIDreported = "";
  if (location.state) {
    userIDreported = location.state.id;
  }
  const [errors, setError] = useState({})
  const userID = getLocalStorage().id;
  const [msgSupport, setMsgSupport] = useStateWithCallbackLazy({
    userID: userID ? userID :  "000",
    userIDreported: userIDreported,
    subject: location.state ? asuntos2[1] : "",
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
    if(asuntos2.includes(e.target.value) && e.target.value !== 'vacio') {
      setMsgSupport({
        ...msgSupport,
        subject: e.target.value
      })
    }
  }  
  
  async function handleSubmit(e) {
    if(msgSupport.subject === "" || msgSupport.description === "") {
      setError(                          
        validate({
          ...msgSupport,
          [e.target.name]: e.target.value  
        })
      )
    } else {
      e.preventDefault()
      try{
        switch (msgSupport.subject) {
          case asuntos2[0]:
            var realSubject = "jobs";
          break;
          case asuntos2[1]:
            var realSubject = "report";
          break;
          case asuntos2[2]:
            var realSubject = "recoverAccount";
          break; 
          default: var realSubject = "otherSubject";   
        }
        
        let body = {
          id_user_client: msgSupport.userID,
          feedback_claims: msgSupport.description,
          id: msgSupport.userIDreported,
          subject: realSubject
        }

        await axios.post('/claims', body);
        alert('Gracias, hemos recibido su problema!')
        setMsgSupport({
          userID: "",
          userIDreported: "",                          
          subject: "",
          description: ""
        })
        location.state ? navigate(`../details/${msgSupport.userIDreported}`, { replace: true }) : navigate("../home", { replace: true });
      }catch(e){
        console.log(e);
      }
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
                {location.state ? asuntos2.map( a => {
                  return (<option key={a} value={a}>{a}</option>)
                }) 
                : asuntos.map( a => {
                  return (<option key={a} value={a}>{a}</option>)
                }) 
                }
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