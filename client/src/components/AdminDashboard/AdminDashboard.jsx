import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { getAllUsersForAdmin, getAllReviewsForAdmin,getAllOrdersForAdmin } from '../../redux/adminActions';
import { useDispatch, useSelector } from "react-redux";
import s from './AdminDashboard.module.scss'
import UsersAdminPanel from "./UsersAdminPanel/UsersAdminPanel";
import ReviewsAdminPanel from "./ReviewsAdminPanel/ReviewsAdminPanel";
import OrdersAdminPanel from "./OrdersAdminPanel/OrdersAdminPanel"
import { useDebugValue } from "react";

//ordenar por rating.
//buscar por nombre.
//boton para banear, eliminar.
//
//
//
//

function AdminDashboard() {
  const dispatch = useDispatch()
  const [panelDiplayed, setPanelDisplayed] = useState("usersPanel");
  //cambiar por el estado de todos los usuarios
  const users = useSelector( state => state.admin.users);
  const reviews = useSelector( state => state.admin.reviews);
  const orders = useSelector( state => state.admin.orders)
  //Fetching user states
  const fetchingAdminDeleteUserSuccess = useSelector(state => state.fetching.fetchingAdminDeleteUserSuccess)
  const fetchingAdminDeleteUserFailure = useSelector(state => state.fetching.fetchingAdminDeleteUserFailure)
  const fetchingAdminEditUserSuccess = useSelector(state => state.fetching.fetchingAdminEditUserSuccess)
  const fetchingAdminEditUserFailure = useSelector(state => state.fetching.fetchingAdminEditUserFailure)
  //Fetching reviews states
  //const fetchingAdminDeleteReviewSuccess = useSelector(state => state.fetching.fetchingAdminDeleteReviewSuccess)
  //const fetchingAdminDeleteReviewFailure = useSelector(state => state.fetching.fetchingAdminDeleteReviewFailure)
  const fetchingAdminEditReviewSuccess = useSelector(state => state.fetching.fetchingAdminEditReviewSuccess)
  const fetchingAdminEditReviewFailure = useSelector(state => state.fetching.fetchingAdminEditReviewFailure)
  //Fetching orders states
  const fetchingAdminDeleteOrderSuccess = useSelector(state => state.fetching.fetchingAdminDeleteOrderSuccess)
  const fetchingAdminDeleteOrderFailure = useSelector(state => state.fetching.fetchingAdminDeleteOrderFailure)
  const fetchingAdminEditOrderSuccess = useSelector(state => state.fetching.fetchingAdminEditOrderSuccess)
  const fetchingAdminEditOrderFailure = useSelector(state => state.fetching.fetchingAdminEditOrderFailure)

  function handlePanelChange(e) {
    setPanelDisplayed(e.target.value)
  }

  useEffect(() => {
    dispatch(getAllUsersForAdmin())
    dispatch(getAllReviewsForAdmin())
    dispatch(getAllOrdersForAdmin())
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsersForAdmin())
    dispatch(getAllReviewsForAdmin())
    dispatch(getAllOrdersForAdmin())
  },[fetchingAdminDeleteUserFailure,
     fetchingAdminDeleteUserSuccess,
     fetchingAdminEditUserFailure,
     fetchingAdminEditUserSuccess,
     fetchingAdminEditReviewFailure,
     fetchingAdminEditReviewSuccess,
     fetchingAdminDeleteOrderSuccess,
     fetchingAdminDeleteOrderFailure,
     fetchingAdminEditOrderSuccess,
     fetchingAdminEditOrderFailure,
       dispatch])

  return (
    <div className={s.mainContainer}>
    <Navbar />
      <h1 className={s.title}>Admin Dashboard</h1>
      <div className={s.menuAndDisplayContainer}>
        <div className={s.menuContainer}>
          <button onClick={handlePanelChange} value="usersPanel">Usuarios</button>
          <button onClick={handlePanelChange} value="reviewsPanel">Reseñas</button>
          <button onClick={handlePanelChange} value="ordersPanel">Ordenes</button>
          <button onClick={handlePanelChange} value="statsPanel">Estadisticas</button>
        </div>

        <div className={s.searchByNameAndUsersContainer}>
          
          {
            panelDiplayed === "usersPanel" ? <UsersAdminPanel users={users}/> :
            panelDiplayed === "reviewsPanel" ? <ReviewsAdminPanel reviews={reviews} /> :
            panelDiplayed === "ordersPanel" ? <OrdersAdminPanel orders={orders} /> : null
          }
          
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard;