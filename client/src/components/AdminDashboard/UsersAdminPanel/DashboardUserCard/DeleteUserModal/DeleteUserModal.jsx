import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../../../../redux/adminActions';
import s from './DeleteUserModal.module.scss'


export default function DeleteUserModal(props) {
  const { name, id, handleDeleteOpenModal } = props;
  const dispatch = useDispatch();
  const fetchingAdminDeleteUserSuccess = useSelector(state => state.fetching.fetchingAdminDeleteUserSuccess)

  function handleDelete(e){
    if (e.target.name === 'cancel-btn') return handleDeleteOpenModal()
    dispatch(deleteUser(id))
  }

  useEffect(() => {
    if(fetchingAdminDeleteUserSuccess) {
      handleDeleteOpenModal();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchingAdminDeleteUserSuccess])
  

  return (
    <div className={s.container}>
      <div className={s.infoContainer}>
        <h1>Estas seguro que deseas eliminar el usuario {name}?</h1>
        <div className={s.btnContainer}>
          <button type="button" onClick={handleDelete}>Eliminar</button>
          <button type="button" name="cancel-btn" onClick={handleDelete}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
