import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useStateWithCallbackLazy } from 'use-state-with-callback';

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

function handleSubmit(e) {  
  // if(Object.keys(errors).length === 0) { 
  //   e.preventDefault()
  //   dispatch(postRecipe(input))
  //   alert('Gracias, hemos recibido su problema!')
  //   setInput({                          
      
  //   })

  // }
  // e.preventDefault()
}

var asuntos = [
  "Agregar un nuevo oficio que no aparece en el catálogo o en mi perfil",
  "Quiero denunciar a un cliente",
  "Quiero denunciar a un profesional"
];

const Support = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setError] = useState({})
  

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
