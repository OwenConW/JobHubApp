import React, { useEffect, useState } from "react";
import OrderEditModal from './OrderEditModal/OrderEditModal'
import { deleteOrder  } from '../../../../redux/adminActions'
import s from './OrdersDashboardCard.module.scss'
import { useDispatch } from "react-redux";

function OrdersDashboardCard(props) {
  const { id, id_user_professional, id_user_client, description, allowReview, date_created, apointment_date, complete, isActive } = props;
  const dispatch = useDispatch()

  const [editModalActive, setEditModalActive] = useState(false)

  function handleEditOpenModal(e) {
    setEditModalActive(!editModalActive)
  }

  function handleDelete(e) {
    dispatch(deleteOrder(id));
  }
  
  return (
    <div className={`${s.cardContainer}`}>
    {editModalActive? <OrderEditModal handleEditOpenModal={handleEditOpenModal} editModalActive={editModalActive} {...props}/> : null}
    <div className={s.importantInformationContainer}>
      {/* <button onClick={handleOpenModal}>Detalles</button> */}
      <div className={s.nameContainer}>
        <h4>ID Orden</h4>
        <h4>{id}</h4>
      </div>
      <div>
        <h4>ID usuario Profesional</h4>
        <h4>{id_user_professional}</h4>
      </div>
      <div>
        <h4>ID Usuario solicitante</h4>
        <h4>{id_user_client}</h4>
      </div>
      <div>
        <h4>Descripción</h4>
        <h4>{description}</h4>
      </div>
      <div>
        <h4>Fecha de creación</h4>
        <h4>{date_created}</h4>
      </div>
      <div>
        <h4>Fecha pactada</h4>
        <h4>{apointment_date}</h4>
      </div>
      {/* <div>
        <h4>Activa?</h4>
        <h4>{isActive ? "Si" : "No"}</h4>
      </div> */}
      <div>
        <h4>Reseña habilitada?</h4>
        <h4>{allowReview ? "Si" : "No"}</h4>
      </div>
      <div>
        <h4>Finalizada?</h4>
        <h4>{complete ? "Si" : "No"}</h4>
      </div>
      <button className={s.deleteBtn} onClick={handleDelete}>Eliminar</button>
      <button className={s.editBtn} onClick={handleEditOpenModal}>Editar</button>
    </div>
  </div>
  )
}

export default OrdersDashboardCard;