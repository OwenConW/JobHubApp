/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editOrder, actionFetchingAdminEditOrderReset} from '../../../../../redux/adminActions';
import s from './OrderEditModal.module.scss';

function OrderEditModal(props) {

  const { id, id_user_professional, id_user_client, description, allowReview, date_created, apointment_date, complete, isActive, handleEditOpenModal, editModalActive } = props;
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState({...props});

  const fetchingAdminEditOrderSuccess = useSelector(state => state.fetching.fetchingAdminEditOrderSuccess)
  const fetchingAdminEditOrderFailure = useSelector(state => state.fetching.fetchingAdminEditOrderFailure)

  function handleChange(e) {
    setOrderData({...orderData, [e.target.name]: e.target.value})
  }

  function handleClick(e){
    setOrderData({...orderData, [e.target.name]: e.target.value === "Si" ? true : false})
  }

  function handleEdit(e) {
     if (e.target.name === "cancel-btn") return handleEditOpenModal()
    dispatch(editOrder(id, orderData))
  }

  useEffect(() => {
    if (fetchingAdminEditOrderSuccess) {
      handleEditOpenModal(!editModalActive)
      alert('Orden modificada exitosamente')
    } else if(fetchingAdminEditOrderFailure) {
      alert('Error al modificar la Orden')
    }
    dispatch(actionFetchingAdminEditOrderReset())
  },[fetchingAdminEditOrderSuccess, fetchingAdminEditOrderFailure, handleEditOpenModal, editModalActive,dispatch])

  return (
    <div className={s.modalMainContainer}>
        <div className={s.modalContainer}>
          <div className={s.informationLeftSide}>
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
            <div>
              <label htmlFor="description">Descripción</label>
              <input type="text" name="description" value={orderData.description} onChange={handleChange}/>
            </div>
          </div>
          <div className={s.informationRightSide}>
            <div>
              <label htmlFor="date_created">Fecha de creación</label>
              <input type="text" name="date_created" value={orderData.date_created} onChange={handleChange}/>
            </div>
            <div>
              <label htmlFor="apointment_date">Fecha pactada</label>
              <input type="text" name="apointment_date" value={orderData.apointment_date} onChange={handleChange}/>
            </div>
            {/* <div>
              <label htmlFor="isActive">Activa?</label>
              <div>
                <input type="button" name="isActive" value='Si' onClick={handleClick}/>
                <input type="button" name="isActive" value='No' onClick={handleClick}/>
              </div>
            </div> */}
            <div>
              <label htmlFor="allowReview">Reseña habilitada?</label>
              <div>
                <input type="button" name="allowReview" value='Si' onClick={handleClick}/>
                <input type="button" name="allowReview" value='No' onClick={handleClick}/>
              </div>
            </div>
            <div>
              <label htmlFor="complete">Finalizada?</label>
              <div>
                <input type="button" name="complete" value='Si' onClick={handleClick}/>
                <input type="button" name="complete" value='No' onClick={handleClick}/>
              </div>
            </div>
            <button name="cancel-btn" onClick={handleEdit}>Cancelar</button>
            <button onClick={handleEdit}>Editar</button>
          </div>
        </div>
    </div>
  )
}

export default OrderEditModal;