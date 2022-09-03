import React, { useState } from "react";
import { useEffect } from "react";
import s from './DifussionAdminPanel.module.scss'

function DifussionAdminPanel(){

  const [difussionInput, setDifussionInput] = useState({text_to_send: ''})

  function handleChange(e){
    setDifussionInput({...difussionInput, [e.target.name]: e.target.value})
  }

  function handleMailSubmit(e) {
    e.preventDefault();
    console.log('enviado');
  }

  return(
    <div>
      <form onSubmit={handleMailSubmit} className={s.container}>
        <label htmlFor="decription">Mensaje a Enviar</label>
        <textarea name="text_to_send" onChange={handleChange} className={s.textareaInput}></textarea>
        <input type="submit" value="Enviar" />
      </form>
    </div>
  )
}


export default DifussionAdminPanel;