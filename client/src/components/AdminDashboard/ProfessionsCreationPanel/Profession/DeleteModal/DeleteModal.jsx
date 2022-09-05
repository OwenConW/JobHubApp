import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfession } from '../../../../../redux/adminActions'
import s from './DeleteModal.module.scss'

function DeleteModal(props){
  const { name, id, handleOpenDeleteModal } = props;  
  const dispatch = useDispatch();
  const fetchingAdminDeleteProfessionSuccess = useSelector(state => state.fetching.fetchingAdminDeleteProfessionSuccess)

  function handleDelete(e) {
    if(e.target.name === "cancel-btn") return handleOpenDeleteModal();
    dispatch(deleteProfession(id))
  }

  useEffect(() =>{
    if (fetchingAdminDeleteProfessionSuccess) {
      handleOpenDeleteModal();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[fetchingAdminDeleteProfessionSuccess])

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