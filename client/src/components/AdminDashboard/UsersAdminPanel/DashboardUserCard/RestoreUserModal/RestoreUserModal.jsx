import React, { useEffect } from 'react'
import s from './RestoreUserModal.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { restoreUser } from '../../../../../redux/adminActions'


export default function RestoreUserModal(props) {
  const { name, id, handleRestoreOpenModal } = props; 
  const dispatch = useDispatch();
  const fetchingAdminRestoreUserSuccess = useSelector(state => state.fetching.fetchingAdminRestoreUserSuccess)

  function handleRestore(e) {
    if(e.target.name === "cancel-btn") return handleRestoreOpenModal();
    dispatch(restoreUser(id))
  }

  useEffect(() =>{
    if (fetchingAdminRestoreUserSuccess) {
      handleRestoreOpenModal();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[fetchingAdminRestoreUserSuccess])


  return (
    <div className={s.container}>
      <div className={s.infoContainer}>
        <h1>Estas seguro que deseas restaurar el usuario {name}?</h1>
        <div className={s.btnContainer}>
          <button type="button" onClick={handleRestore}>Restaurar</button>
          <button type="button" name="cancel-btn" onClick={handleRestore}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
