/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { getAllUsersForAdmin, 
         getAllReviewsForAdmin,
         getAllOrdersForAdmin,
         getAllClaimsForAdmin,
         actionFetchingAdminDeleteUserReset, 
         actionFetchingAdminRestoreUserReset,
         actionFetchingAdminDeleteReviewReset,
         actionFetchingAdminDeleteOrderReset,
         actionFetchingAdminCreateProfessionReset,
         actionFetchingAdminDeleteProfessionReset,
         actionFetchingAdminDeleteClaimReset,
         actionFetchingUsersReset } from '../../redux/adminActions';
import { actionGetAllJobs } from "../../redux/jobActions";
import { useDispatch, useSelector } from "react-redux";
import s from './AdminDashboard.module.scss'
import UsersAdminPanel from "./UsersAdminPanel/UsersAdminPanel";
import ReviewsAdminPanel from "./ReviewsAdminPanel/ReviewsAdminPanel";
import OrdersAdminPanel from "./OrdersAdminPanel/OrdersAdminPanel"
import DifussionAdminPanel from "./DiffusionAdminPanel/DifussionAdminPanel";
import ProfessionsCreationPanel from "./ProfessionsCreationPanel/ProfessionsCreationPanel";
import * as functions from '../../handlers/localStorage'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import ReportsAdminPanel from "./ReportsAdminPanel/ReportsAdminPanel";
import Swal from 'sweetalert2'


function AdminDashboard() {
  const activeUser = functions.getLocalStorage();
  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //if(!isAuthenticated) navigate('/')
  //if(!activeUser?.isAdmin) navigate('/home')

  const [panelDiplayed, setPanelDisplayed] = useState("usersPanel");
  const [isActive, setIsActive] = useState({usersPanel: true, reviewsPanel: false, ordersPanel: false, professionsPanel: false})


  const users = useSelector( state => state.admin.users);
  const reviews = useSelector( state => state.admin.reviews);
  const orders = useSelector( state => state.admin.orders)
  const professions = useSelector( state => state.jobs.jobs)

  //ESTOS ESTADOS SON PARA EL HANDLING DE ERRORES, DE EXITO Y DE CUANDO ESTA BUSCANDO EN LA DB, SE VAN A USAR PARA LAS ALERTAS

  //Fetching user states
  //Fetch
  const fetchingUsersFailure = useSelector(state => state.fetching.fetchingUsersFailure)

  //delete
  const fetchingAdminDeleteUserSuccess = useSelector(state => state.fetching.fetchingAdminDeleteUserSuccess)
  const fetchingAdminDeleteUserFailure = useSelector(state => state.fetching.fetchingAdminDeleteUserFailure)
  //restore
  const fetchingAdminRestoreUserFailure = useSelector(state => state.fetching.fetchingAdminRestoreUserFailure)
  const fetchingAdminRestoreUserSuccess = useSelector(state => state.fetching.fetchingAdminRestoreUserSuccess)

  //Fetching REVIEWS states
  const fetchingAdminDeleteReviewSuccess = useSelector(state => state.fetching.fetchingAdminDeleteReviewSuccess)
  const fetchingAdminDeleteReviewFailure = useSelector(state => state.fetching.fetchingAdminDeleteReviewFailure)

  //Fetching ORDERS states
  const fetchingAdminDeleteOrderSuccess = useSelector(state => state.fetching.fetchingAdminDeleteOrderSuccess)
  const fetchingAdminDeleteOrderFailure = useSelector(state => state.fetching.fetchingAdminDeleteOrderFailure)
  
  //Fetching Profession creation states
  const fetchingAdminCreateProfessionSuccess = useSelector(state => state.fetching.fetchingAdminCreateProfessionSuccess)
  const fetchingAdminCreateProfessionFailure = useSelector(state => state.fetching.fetchingAdminCreateProfessionFailure)
  //Fetching Profession delete states
  const fetchingAdminDeleteProfessionSuccess = useSelector(state => state.fetching.fetchingAdminDeleteProfessionSuccess)
  const fetchingAdminDeleteProfessionFailure = useSelector(state => state.fetching.fetchingAdminDeleteProfessionFailure)
  
  //Fetching CLAIM states
  //DELETE
  const fetchingAdminDeleteClaimFailure = useSelector(state => state.fetching.fetchingAdminDeleteClaimFailure)
  const fetchingAdminDeleteClaimSuccess = useSelector(state => state.fetching.fetchingAdminDeleteClaimSuccess)


  //FUNCION QUE CAMBIA EL PANEL QUE SE MUESTRA (usuarios, reviews, ordenes)
  function handlePanelChange(e) {
    setPanelDisplayed(e.target.value)
    setIsActive({...!isActive, [e.target.value]: !isActive[e.target.value]})
    //setIsActive({[e.target.value]: !isActive[e.target.value]})
  }

  //FETCH DE LA DB
  useEffect(() => {
    dispatch(getAllUsersForAdmin())
    dispatch(getAllReviewsForAdmin())
    dispatch(getAllOrdersForAdmin())
    dispatch(actionGetAllJobs())
    dispatch(getAllClaimsForAdmin())
  }, [dispatch])

  //Alert fetchUsers
  useEffect(() => {
    if(fetchingUsersFailure) {
      Swal.fire({
        icon: 'error',
        title: 'Hubo un problema al traer los usuarios',
        showConfirmButton: false,
        timer: 2200,
        position: 'top-end',
        backdrop: false,
      })
    }
    dispatch(actionFetchingUsersReset())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchingUsersFailure])

  //Alert DELETE USER
  useEffect(() => {
    if(fetchingAdminDeleteUserSuccess) {
      Swal.fire({
        icon: 'success',
        title: 'El usuario fue eliminado correctamente',
        showConfirmButton: false,
        timer: 2200,
        position: 'top-end',
        backdrop: false,
      })
    } else if (fetchingAdminDeleteUserFailure) {
      Swal.fire({
        icon: 'error',
        title: 'Hubo un problema al eliminar el usuario',
        showConfirmButton: false,
        timer: 2200,
        position: 'top-end',
        backdrop: false,
      })
    }
    dispatch(actionFetchingAdminDeleteUserReset())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchingAdminDeleteUserSuccess, fetchingAdminDeleteUserFailure])

  //Alert RESTORE USER
  useEffect(() => {
    if(fetchingAdminRestoreUserSuccess) {
      Swal.fire({
        icon: 'success',
        title: 'El usuario fue restaurado correctamente',
        showConfirmButton: false,
        timer: 2200,
        position: 'top-end',
        backdrop: false,
      })
    } else if (fetchingAdminRestoreUserFailure) {
      Swal.fire({
        icon: 'error',
        title: 'Hubo un problema al restaurar el usuario',
        showConfirmButton: false,
        timer: 2200,
        position: 'top-end',
        backdrop: false,
      })
    }
    dispatch(actionFetchingAdminRestoreUserReset())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchingAdminRestoreUserFailure, fetchingAdminRestoreUserSuccess])
  
  //Alert DELETE REVIEW
  useEffect(() => {
    if(fetchingAdminDeleteReviewSuccess) {
      Swal.fire({
        icon: 'success',
        title: 'La reseña ha sido eliminada correctamente.',
        showConfirmButton: false,
        timer: 2200,
        position: 'top-end',
        backdrop: false,
      })
    } else if (fetchingAdminDeleteReviewFailure) {
      Swal.fire({
        icon: 'error',
        title: 'Hubo un problema al eliminar la reseña',
        showConfirmButton: false,
        timer: 2200,
        position: 'top-end',
        backdrop: false,
      })
    }
    dispatch(actionFetchingAdminDeleteReviewReset())
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchingAdminDeleteReviewSuccess,fetchingAdminDeleteReviewFailure])
   
  //Alert DELETE ORDER
  useEffect(() => {
    if(fetchingAdminDeleteOrderSuccess) {
      Swal.fire({
        icon: 'success',
        title: 'La orden ha sido eliminada correctamente.',
        showConfirmButton: false,
        timer: 2200,
        position: 'top-end',
        backdrop: false,
      })
    } else if (fetchingAdminDeleteOrderFailure) {
      Swal.fire({
        icon: 'error',
        title: 'Hubo un problema al eliminar la orden.',
        showConfirmButton: false,
        timer: 2200,
        position: 'top-end',
        backdrop: false,
      })
    }
    dispatch(actionFetchingAdminDeleteOrderReset())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchingAdminDeleteOrderSuccess,fetchingAdminDeleteOrderFailure])

  //Alert create Profession
  useEffect(() => {
    if(fetchingAdminCreateProfessionSuccess) {
      Swal.fire({
        icon: 'success',
        title: 'La profesión ha sido creada correctamente.',
        showConfirmButton: false,
        timer: 2200,
        position: 'top-end',
        backdrop: false,
      })
    } else if (fetchingAdminCreateProfessionFailure) {
      Swal.fire({
        icon: 'error',
        title: 'Hubo un problema al crear la profesión',
        showConfirmButton: false,
        timer: 2200,
        position: 'top-end',
        backdrop: false,
      })
    }
    dispatch(actionFetchingAdminCreateProfessionReset())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchingAdminCreateProfessionSuccess,fetchingAdminCreateProfessionFailure])

  //Alert delete Profession
  useEffect(() => {
    if(fetchingAdminDeleteProfessionSuccess) {
      Swal.fire({
        icon: 'success',
        title: 'La profesión ha sido eliminada correctamente.',
        showConfirmButton: false,
        timer: 2200,
        position: 'top-end',
        backdrop: false,
      })
    } else if (fetchingAdminDeleteProfessionFailure) {
      Swal.fire({
        icon: 'error',
        title: 'Hubo un problema al eliminar la profesión.',
        showConfirmButton: false,
        timer: 2200,
        position: 'top-end',
        backdrop: false,
      })
    }
    dispatch(actionFetchingAdminDeleteProfessionReset())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchingAdminDeleteProfessionSuccess,fetchingAdminDeleteProfessionFailure])

  useEffect(() => {
    if(fetchingAdminDeleteClaimSuccess) {
      Swal.fire({
        icon: 'success',
        title: 'El reporte ha sido eliminado correctamente.',
        showConfirmButton: false,
        timer: 2200,
        position: 'top-end',
        backdrop: false,
      })
    } else if (fetchingAdminDeleteClaimFailure) {
      Swal.fire({
        icon: 'error',
        title: 'Hubo un problema al eliminar el reporte.',
        showConfirmButton: false,
        timer: 2200,
        position: 'top-end',
        backdrop: false,
      })
    }
    dispatch(actionFetchingAdminDeleteClaimReset())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchingAdminDeleteClaimSuccess,fetchingAdminDeleteClaimFailure])


  return (
    <>
      {
        // activeUser?.isAdmin ? (

          <div className={s.mainContainer}>
          <Navbar />
            <h1 className={s.title}>Panel de gestión</h1>
            <div className={s.menuAndDisplayContainer}>
              <div className={s.menuContainer}>
                <button onClick={handlePanelChange} className={isActive.usersPanel ? s.selected : null} value="usersPanel">Usuarios</button>
                <button onClick={handlePanelChange} className={isActive.reviewsPanel ? s.selected : null} value="reviewsPanel">Reseñas</button>
                <button onClick={handlePanelChange} className={isActive.ordersPanel ? s.selected : null} value="ordersPanel">Ordenes</button>
                <button onClick={handlePanelChange} className={isActive.professionsPanel ? s.selected : null} value="professionsPanel">Profesiones</button>
                <button onClick={handlePanelChange} className={isActive.claimsPanel ? s.selected : null} value="claimsPanel">Reportes</button>
                {/* <button onClick={handlePanelChange} value="difussionPanel">Difusión</button> */}
                {/* <button onClick={handlePanelChange} value="statsPanel">Estadisticas</button> */}
              </div>
    
              <div className={s.searchByNameAndUsersContainer}>
                
                {
                  panelDiplayed === "usersPanel" ? <UsersAdminPanel users={users}/> :
                  panelDiplayed === "reviewsPanel" ? <ReviewsAdminPanel reviews={reviews} /> :
                  panelDiplayed === "ordersPanel" ? <OrdersAdminPanel orders={orders} /> : 
                  panelDiplayed === "professionsPanel" ? <ProfessionsCreationPanel professions={professions} /> : 
                  panelDiplayed === "claimsPanel" ? <ReportsAdminPanel /> : null
                  // panelDiplayed === "difussionPanel" ? <DifussionAdminPanel /> : null
                }
                
              </div>
            </div>
          </div>
        //) : (<h1>Este panel es solo para administradores. Y claramente vos no lo sos. c:</h1>)
      }
    </>
  )
}

export default AdminDashboard;