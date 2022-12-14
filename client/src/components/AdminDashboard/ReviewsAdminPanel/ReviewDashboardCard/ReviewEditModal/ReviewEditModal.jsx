import React,  { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editReview, actionFetchingAdminEditReviewReset } from '../../../../../redux/adminActions'
import s from './ReviewEditModal.module.scss'

function ReviewEditModal(props) {
  const { id, id_orders, id_user_professional, id_user_client, handleEditOpenModal, editModalActive } = props;
  const dispatch = useDispatch()
  const [reviewData, setReviewData] = useState({...props})

  const fetchingAdminEditReviewSuccess = useSelector(state => state.fetching.fetchingAdminEditReviewSuccess)
  const fetchingAdminEditReviewFailure = useSelector(state => state.fetching.fetchingAdminEditReviewFailure)

  function handleChange(e) {
    setReviewData({...reviewData, [e.target.name]: e.target.value})
  }

  function handleClick(e){
    setReviewData({...reviewData, [e.target.name]: e.target.value === "Si" ? true : false})
  }

  function handleEdit(e) {
    e.preventDefault()
     if (e.target.name === "cancel-btn") return handleEditOpenModal()
    dispatch(editReview(id_orders, reviewData))
  }

  useEffect(() => {
    if (fetchingAdminEditReviewSuccess) {
      handleEditOpenModal(!editModalActive)
      alert('Reseña modificada exitosamente')
    } else if(fetchingAdminEditReviewFailure) {
      alert('Error al modificar la reseña')
    }
    dispatch(actionFetchingAdminEditReviewReset())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[fetchingAdminEditReviewSuccess, fetchingAdminEditReviewFailure])

  return (
    <div className={s.modalMainContainer}>
        <form onSubmit={handleEdit} className={s.modalContainer}>
          <div className={s.informationLeftSide}>
            <div>
              <label htmlFor="id">ID Reseña</label>
              <h2>{id_orders}</h2>
            </div>
            <div>
            <label htmlFor="id">ID Orden</label>
            <h2>{id}</h2>
            </div>
            <div>
            <label htmlFor="id">ID Usuario Solicitante</label>
              <h2>{id_user_client}</h2>
            </div>
            <div>
            <label htmlFor="id">ID Usuario Profesional</label>
              <h2>{id_user_professional}</h2>
            </div>
          </div>
          <div className={s.informationRightSide}>
            <div>
              <label htmlFor="rating">Rating</label>
              <h2>{reviewData.rating}</h2>
            </div>
            <div>
              <label htmlFor="feedback_client">Descripción</label>
              <h2>{reviewData.feedback_client}</h2>
            </div>
            <div>
              <label htmlFor="isActive">Activa?</label>
              <div>
                <input className={`${reviewData.isActive ? s.yesBtn : null}`} type="button" name="isActive" value='Si' onClick={handleClick}/>
                <input className={`${!reviewData.isActive ? s.noBtn : null}`} type="button" name="isActive" value='No' onClick={handleClick}/>
              </div>
            </div>
            <div>
              <input className={s.editBtn} type="submit" value="Editar" />
              <button className={s.cancelBtn} name="cancel-btn" onClick={handleEdit}>Cancelar</button>
            </div>
          </div>
        </form>
    </div>
  )
}

export default ReviewEditModal;