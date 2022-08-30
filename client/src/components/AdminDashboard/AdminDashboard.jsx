import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { getAllUsersForAdmin, 
         getAllReviewsForAdmin,
         getAllOrdersForAdmin, 
         actionFetchingAdminDeleteUserReset, 
         actionFetchingAdminRestoreUserReset,
         actionFetchingAdminDeleteReviewReset,
         actionFetchingAdminDeleteOrderReset } from '../../redux/adminActions';
import { useDispatch, useSelector } from "react-redux";
import s from './AdminDashboard.module.scss'
import UsersAdminPanel from "./UsersAdminPanel/UsersAdminPanel";
import ReviewsAdminPanel from "./ReviewsAdminPanel/ReviewsAdminPanel";
import OrdersAdminPanel from "./OrdersAdminPanel/OrdersAdminPanel"

function AdminDashboard() {
  const dispatch = useDispatch()
  const [panelDiplayed, setPanelDisplayed] = useState("reviewsPanel");

  const users = useSelector( state => state.admin.users);
  const reviews = useSelector( state => state.admin.reviews);
  const orders = useSelector( state => state.admin.orders)
  //ESTOS ESTADOS SON PARA EL HANDLING DE ERRORES, DE EXITO Y DE CUANDO ESTA BUSCANDO EN LA DB, SE VAN A USAR PARA LAS ALERTAS

  //Fetching user states
  const fetchingAdminDeleteUserSuccess = useSelector(state => state.fetching.fetchingAdminDeleteUserSuccess)
  const fetchingAdminDeleteUserFailure = useSelector(state => state.fetching.fetchingAdminDeleteUserFailure)
  const fetchingAdminEditUserSuccess = useSelector(state => state.fetching.fetchingAdminEditUserSuccess)
  const fetchingAdminEditUserFailure = useSelector(state => state.fetching.fetchingAdminEditUserFailure)
  const fetchingAdminRestoreUserFailure = useSelector(state => state.fetching.fetchingAdminRestoreUserFailure)
  const fetchingAdminRestoreUserSuccess = useSelector(state => state.fetching.fetchingAdminRestoreUserSuccess)

  //Fetching reviews states
  const fetchingAdminDeleteReviewSuccess = useSelector(state => state.fetching.fetchingAdminDeleteReviewSuccess)
  const fetchingAdminDeleteReviewFailure = useSelector(state => state.fetching.fetchingAdminDeleteReviewFailure)
  const fetchingAdminEditReviewSuccess = useSelector(state => state.fetching.fetchingAdminEditReviewSuccess)
  const fetchingAdminEditReviewFailure = useSelector(state => state.fetching.fetchingAdminEditReviewFailure)

  //Fetching orders states
  const fetchingAdminDeleteOrderSuccess = useSelector(state => state.fetching.fetchingAdminDeleteOrderSuccess)
  const fetchingAdminDeleteOrderFailure = useSelector(state => state.fetching.fetchingAdminDeleteOrderFailure)
  const fetchingAdminEditOrderSuccess = useSelector(state => state.fetching.fetchingAdminEditOrderSuccess)
  const fetchingAdminEditOrderFailure = useSelector(state => state.fetching.fetchingAdminEditOrderFailure)

  //FUNCION QUE CAMBIA EL PANEL QUE SE MUESTRA (usuarios, reviews, ordenes)
  function handlePanelChange(e) {
    setPanelDisplayed(e.target.value)
  }
  //FETCH DE LA DB
  useEffect(() => {
    dispatch(getAllUsersForAdmin())
    dispatch(getAllReviewsForAdmin())
    dispatch(getAllOrdersForAdmin())
  }, [dispatch])

  //Alert DELETE USER
  useEffect(() => {
    if(fetchingAdminDeleteUserSuccess) {
      alert('Usuario eliminado correctamundo')
    } else if (fetchingAdminDeleteUserFailure) {
      alert('Hubo un error al eliminar el usuario')
    }
    dispatch(actionFetchingAdminDeleteUserReset())
  }, [fetchingAdminDeleteUserSuccess, fetchingAdminDeleteUserFailure])

  //Alert RESTORE USER
  useEffect(() => {
    if(fetchingAdminRestoreUserSuccess) {
      alert('Usuario restaurado correctamundo')
    } else if (fetchingAdminRestoreUserFailure) {
      alert('Hubo un error al restaurar el usuario')
    }
    dispatch(actionFetchingAdminRestoreUserReset())
  }, [fetchingAdminRestoreUserFailure, fetchingAdminRestoreUserSuccess])
  
  //Alert DELETE REVIEW
  useEffect(() => {
    if(fetchingAdminDeleteReviewSuccess) {
      alert('Reseña eliminada correctamundo')
    } else if (fetchingAdminDeleteReviewFailure) {
      alert('Hubo un error al eliminar la reseña')
    }
    dispatch(actionFetchingAdminDeleteReviewReset())
    
  }, [fetchingAdminDeleteReviewSuccess,fetchingAdminDeleteReviewFailure])
   
  //Alert DELETE ORDER
  useEffect(() => {
    if(fetchingAdminDeleteOrderSuccess) {
      alert('Orden eliminada correctamundo')
    } else if (fetchingAdminDeleteOrderFailure) {
      alert('Hubo un error al eliminar la Orden')
    }
    dispatch(actionFetchingAdminDeleteOrderReset())
  }, [fetchingAdminDeleteOrderSuccess,fetchingAdminDeleteOrderFailure])

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