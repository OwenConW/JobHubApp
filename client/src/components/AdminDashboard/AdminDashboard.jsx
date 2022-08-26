import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { getAllUsersForAdmin, getAllReviewsForAdmin } from '../../redux/adminActions';
import { useDispatch, useSelector } from "react-redux";
import s from './AdminDashboard.module.scss'
import UsersAdminPanel from "./UsersAdminPanel/UsersAdminPanel";
import ReviewsAdminPanel from "./ReviewsAdminPanel/ReviewsAdminPanel";

//ordenar por rating.
//buscar por nombre.
//boton para banear, eliminar.
//
//
//
//

function AdminDashboard() {
  const dispatch = useDispatch()
  const [panelDiplayed, setpanelDisplayed] = useState("reviewsPanel");
  //cambiar por el estado de todos los usuarios
  const users = useSelector( state => state.admin.users);
  const reviews = useSelector( state => state.admin.reviews);
  const fetchingAdminDeleteUserFailure = useSelector(state => state.fetching.fetchingAdminDeleteUserFailure)
  const fetchingAdminDeleteUserSuccess = useSelector(state => state.fetching.fetchingAdminDeleteUserSuccess)
  const fetchingAdminEditUserSuccess = useSelector(state => state.fetching.fetchingAdminEditUserSuccess)
  const fetchingAdminEditUserFailure = useSelector(state => state.fetching.fetchingAdminEditUserFailure)

  function handlePanelChange(e) {
    setpanelDisplayed(e.target.value)
  }

  useEffect(() => {
    dispatch(getAllUsersForAdmin())
    dispatch(getAllReviewsForAdmin())
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsersForAdmin())
  },[fetchingAdminDeleteUserFailure, fetchingAdminDeleteUserSuccess, fetchingAdminEditUserFailure, fetchingAdminEditUserSuccess, dispatch])

  return (
    <div className={s.mainContainer}>
    <Navbar />
      <h1 className={s.title}>Admin Dashboard</h1>
      <div className={s.menuAndDisplayContainer}>
        <div className={s.menuContainer}>
          <button onClick={handlePanelChange} value="usersPanel">Usuarios</button>
          <button onClick={handlePanelChange} value="reviewsPanel">Reseñas</button>
          <button onClick={handlePanelChange} value="statsPanel">Estadisticas</button>
        </div>

        <div className={s.searchByNameAndUsersContainer}>
          
          {
            panelDiplayed === "usersPanel" ? <UsersAdminPanel users={users}/> :
            panelDiplayed === "reviewsPanel" ? <ReviewsAdminPanel reviews={reviews} /> : null
          }
          
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard;