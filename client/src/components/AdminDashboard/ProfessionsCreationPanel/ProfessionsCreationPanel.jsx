import React, {useState} from "react";
import Profession from './Profession/Profession'
import { createProfession } from '../../../redux/adminActions'
import { useDispatch } from 'react-redux';



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
    <div>
      <h1>Eliminar profesión</h1>
      <div>
        {professions.length ? professions?.map(p => {
          return(
            <Profession {...p}/>
          )
        }) :
        <h1>No hay profesiones existentes.</h1>
        }
      <h1>Crear Profesión</h1>
      <form onSubmit={handleProfessionCreationSubmit}>
        <label htmlFor="profession_name">Nombre de la profesión</label>
        <input type="text" name='profession_name' onChange={handleProfessionInputChange}/>
        <input type="submit" />
      </form>
      </div>
    </div>
  )
}


export default ProfessionsCreationPanel;