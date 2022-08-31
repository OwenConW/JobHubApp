import React from "react";
import { useDispatch } from "react-redux";
import { deleteProfession } from '../../../../../redux/adminActions'
import s from './DeleteModal.module.scss'

function DeleteModal(props){
  const { name, id, handleOpenDeleteModal } = props;  
  const dispatch = useDispatch();

  function handleDelete(e) {
    if(e.target.name === "cancel-btn") return handleOpenDeleteModal();
    console.log(id);
    dispatch(deleteProfession(id))
    handleOpenDeleteModal();
  }

  return (
    <div className={s.container}>
      <div className={s.infoContainer}>
        <h1>Estas seguro que deseas eliminar la profesion {name}?</h1>
        <div className={s.btnContainer}>
          <button type="button" onClick={handleDelete}>Eliminar</button>
          <button type="button" name="cancel-btn" onClick={handleDelete}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal;