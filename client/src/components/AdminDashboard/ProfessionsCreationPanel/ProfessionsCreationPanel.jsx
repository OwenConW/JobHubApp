import React, {useState} from "react";
import Profession from './Profession/Profession'
import { createProfession } from '../../../redux/adminActions'
import { useDispatch } from 'react-redux';
import s from './ProfessionsCreationPanel.module.scss'



function ProfessionsCreationPanel(props) {
  const { professions } = props;
  const dispatch = useDispatch();
  const [professionCreationInput, setProfessionCreationInput] = useState('')


  function handleProfessionInputChange(e) {
    setProfessionCreationInput(e.target.value)
  }

  function handleProfessionCreationSubmit(e){
    e.preventDefault();
    if (!professionCreationInput) return
    dispatch(createProfession(professionCreationInput))
  }

  return(
    <div className={s.mainContainer}>
      <div className={s.professionDeleteContainer}>
        <h1 className={s.professionDeleteTitle}>Eliminar profesión</h1>
        <div className={s.divisoryLine}></div>
        <div className={s.existingProfessionsContainer}>
          {professions.length ? professions?.map(p => {
            return(
              <Profession {...p}/>
            )
          }) :
          <h1>No hay profesiones existentes.</h1>
          }
        </div>
      </div>
      <div>
        <h1>Crear Profesión</h1>
        <form className={s.formContainer} onSubmit={handleProfessionCreationSubmit}>
          <div className={s.professionCreationInputAndLabel}>
            <label htmlFor="profession_name">Nombre de la profesión</label>
            <input type="text" name='profession_name' onChange={handleProfessionInputChange}/>
          </div>
          <input className={s.submitBtn} type="submit" value="Crear Profesion" />
        </form>
      </div>
    </div>
  )
}


export default ProfessionsCreationPanel;