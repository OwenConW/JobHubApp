import React,  { useState } from "react";
import { useEffect } from "react";
import s from './ReviewEditModal.module.scss'

function ReviewEditModal(props) {
  const { id, id_orders, id_user_professional, id_user_client, feedback_client, rating, isActive } = props;

  const [reviewData, setReviewData] = useState({...props})

  function handleChange(e) {
    setReviewData({...reviewData, [e.target.name]: e.target.value})
  }

  function handleClick(e){
    setReviewData({...reviewData, [e.target.name]: e.target.value === "Si" ? true : false})
  }

  function handleEdit(e) {
     
  }

  useEffect(() => {
    console.log(reviewData);
  }, [reviewData])

  return (
    <div className={s.modalMainContainer}>
        <div className={s.modalContainer}>
          <div className={s.informationLeftSide}>
            <div>
              <label htmlFor="id">ID Reseña</label>
              <h2>{id}</h2>
            </div>
            <div>
            <label htmlFor="id">ID Orden</label>
              <h2>{id_orders}</h2>
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
              <input type="text" name="rating" value={reviewData.rating} onChange={handleChange}/>
            </div>
            <div>
              <label htmlFor="feedback_client">Descripción</label>
              <input type="text" name="feedback_client" value={reviewData.feedback_client} onChange={handleChange}/>
            </div>
            <div>
              <label htmlFor="isActive">Activa?</label>
              <div>
                <input type="button" name="isActive" value='Si' onClick={handleClick}/>
                <input type="button" name="isActive" value='No' onClick={handleClick}/>
              </div>
            </div>
            <button name="cancel-btn" onClick={handleEdit}>Cancelar</button>
            <button onClick={handleEdit}>Editar</button>
          </div>
        </div>
    </div>
  )
}

export default ReviewEditModal;