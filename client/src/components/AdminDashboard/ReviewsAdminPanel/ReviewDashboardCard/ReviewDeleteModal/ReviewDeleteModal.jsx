import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteReviews } from '../../../../../redux/adminActions';
import s from './ReviewDeleteModal.module.scss'

export default function ReviewDeleteModal(props) {
  // eslint-disable-next-line no-unused-vars
  const { name, id, handleDeleteOpenModal } = props;
  const fetchingAdminDeleteReviewSuccess = useSelector(state => state.fetching.fetchingAdminDeleteReviewSuccess)
  const dispatch = useDispatch();

  function handleDelete(e){
    if (e.target.name === 'cancel-btn') return handleDeleteOpenModal()
    dispatch(deleteReviews(id))
  }

  useEffect(() => {
    if(fetchingAdminDeleteReviewSuccess) {
      handleDeleteOpenModal();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchingAdminDeleteReviewSuccess])
  

  return (
    <div className={s.container}>
      <div className={s.infoContainer}>
        <h1>Estas seguro que deseas eliminar la reseña?</h1>
        <div className={s.btnContainer}>
          <button className={s.deleteBtn} type="button" onClick={handleDelete}>Eliminar</button>
          <button className={s.cancelBtn} type="button" name="cancel-btn" onClick={handleDelete}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
