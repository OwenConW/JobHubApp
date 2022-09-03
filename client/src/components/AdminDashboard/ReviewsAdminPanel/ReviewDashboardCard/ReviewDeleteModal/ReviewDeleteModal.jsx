import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteReviews } from '../../../../../redux/adminActions';
import s from './ReviewDeleteModal.module.scss'

export default function ReviewDeleteModal(props) {
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
  }, [fetchingAdminDeleteReviewSuccess])
  

  return (
    <div className={s.container}>
      <div className={s.infoContainer}>
        <h1>Estas seguro que deseas eliminar la reseña?</h1>
        <div className={s.btnContainer}>
          <button type="button" onClick={handleDelete}>Eliminar</button>
          <button type="button" name="cancel-btn" onClick={handleDelete}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
