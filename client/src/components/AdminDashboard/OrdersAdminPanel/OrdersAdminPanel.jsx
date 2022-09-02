import React, { useState, useEffect } from "react";
import OrdersDashboardCard from "./OrdersDashboardCard/OrdersDashboardCard"
import s from './OrdersAdminPanel.module.scss'
import { getOrdersByUserProfessionalId, getOrdersByUserClientId, getOrderByIdForAdmin, actionGetOrdersBylId, getAllOrdersForAdmin } from '../../../redux/adminActions'
import { useDispatch } from "react-redux";

function OrdersAdminPanel(props) {
  const { orders } = props;
  const dispatch = useDispatch();

  const [searchByIdInput, setSearchByIdInput] = useState({order_id: '', order_user_professional_id:'', order_user_client_id:''});

  function handleSearchOrderByUserIdChange(e) {
    setSearchByIdInput({...searchByIdInput, [e.target.name]: e.target.value})
  }

  function getAllOrders(e){
    dispatch(getAllOrdersForAdmin())
  }

  //SUBMIT USER PROFESIONAL ID
   function handleSearchOrderByUserProfessionalIdSubmit(e) {
    e.preventDefault();
    if(!searchByIdInput.order_user_professional_id) return
    dispatch(getOrdersByUserProfessionalId(searchByIdInput.order_user_professional_id));
  }
  
  //SUBMIT USER CLIENTE ID
  function handleSearchOrderByUserClientIdSubmit(e) {
    e.preventDefault();
    if(!searchByIdInput.order_user_client_id) return
    dispatch(getOrdersByUserClientId(searchByIdInput.order_user_client_id));
  }

  //SUBMIT ORDER ID
  function handleSearchOrderByIdSubmit(e) {
    e.preventDefault();
    if(!searchByIdInput.order_id) return
    dispatch(actionGetOrdersBylId(searchByIdInput.order_id));
  }

  return (
    <div className={s.mainContainer}>
      <div className={s.formsContainer}>
        <form onSubmit={handleSearchOrderByIdSubmit}>
          <label htmlFor="order_id">Buscar orden por ID</label>
          <input type="text" name="order_id" onChange={handleSearchOrderByUserIdChange} />
          <input className={s.submitBtn} type="submit" value="buscar" />
        </form>
        <form onSubmit={handleSearchOrderByUserProfessionalIdSubmit}>
          <label htmlFor="order_user_professional_id">Buscar orden por ID del usuario profesional</label>
          <input type="text" name="order_user_professional_id" onChange={handleSearchOrderByUserIdChange} />
          <input className={s.submitBtn} type="submit" value="buscar" />
        </form>
        <form onSubmit={handleSearchOrderByUserClientIdSubmit}>
          <label htmlFor="order_user_client_id">Buscar orden por ID del usuario cliente</label>
          <input type="text" name="order_user_client_id" onChange={handleSearchOrderByUserIdChange} />
          <input className={s.submitBtn} type="submit" value="buscar" />
        </form>
      </div>

      <button className={s.allOrdersBtn} onClick={getAllOrders}>Traer todas las ordenes</button>
      <div className={s.divisoryLine}></div>

      <div className={s.ordersContainer}>
        {
          orders[0]? orders?.map( r => {
            return (
                <OrdersDashboardCard {...r} />
                )
              }) :
          <h1>No existen ordenes</h1>
        }
      </div>
    </div>
  )
}

export default OrdersAdminPanel;