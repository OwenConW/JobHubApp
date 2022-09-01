import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, actionFetchingAdminEditUserReset } from "../../../../../redux/adminActions";
import { actionGetAllJobs } from '../../../../../redux/jobActions'
import s from './EditModal.module.scss';


function EditModal(props) {
  const { editModalActive, handleEditOpenModal } = props;
  //estado de los datos a enviar a la DB, (professions harcodeado por la misma razon que en el handleRestore)
  const [userData, setUserData] = useState({...props})
  const dispatch = useDispatch()

  //ESTADOS DE HANDLING DE EXITO Y ERROR PARA LA EDICION DE USUARIO
  const fetchingAdminEditUserSuccess = useSelector(state => state.fetching.fetchingAdminEditUserSuccess)
  const fetchingAdminEditUserFailure = useSelector(state => state.fetching.fetchingAdminEditUserFailure)

  //CAMBIA EL ESTADO DE LOS INPUTS (userData), pero para botones.
  function handleClick(e) {
    setUserData({...userData, [e.target.name]: e.target.value === "Si" ? true : false})
  }

  //funcion onSubmit
  function handleEdit(e){
    if(e.target.name === "cancel-btn") return handleEditOpenModal(!editModalActive) 
    if(userData?.professions.length) {
      userData.professions = userData.professions.map( p => p.name)
    }
    e.preventDefault()
    dispatch(editUser(userData.id , userData))
  }
  
  //Success y Error handler del Edit
  useEffect(() => {
    if (fetchingAdminEditUserSuccess) {
      handleEditOpenModal(!editModalActive)   
      alert('Usuario editado correctamente')
    } else if(fetchingAdminEditUserFailure) {
      alert('Hubo un error al editar el usuario')
    }
    dispatch(actionFetchingAdminEditUserReset())
  },[fetchingAdminEditUserSuccess, fetchingAdminEditUserFailure])

  useEffect(() => {
    dispatch(actionGetAllJobs())
  },[dispatch])

  return (
    <div className={s.modalMainContainer}>
      <form className={s.modalContainer} onSubmit={handleEdit}>
        <div className={s.informationLeftSide}>
          <div>
            <label htmlFor="name">Nombre</label>
            <h3>{userData.name}</h3>
          </div>
          <div>
            <label htmlFor="last_Name">Apellido</label>
            <h3>{userData.last_Name}</h3>
          </div>
          <div>
            <label htmlFor="dni">DNI</label>
            <h3>{userData.dni}</h3>
          </div>
          <div>
            <label htmlFor="date_of_birth">Fecha de nacimiento</label>
            <h3>{userData.date_of_birth}</h3>
          </div>
          <div>
            <label htmlFor="rating">Rating</label>
            <h3>{userData.rating === -1 ? "No tiene" : userData.rating}</h3>
          </div>
          <div>
            <label htmlFor="country">Pais</label>
            <h3>{userData.country}</h3>
          </div>
          <div>
            <label htmlFor="city">Ciudad</label>
            <h3>{userData.city}</h3>
          </div>
          <div>
            <label htmlFor="mail">Mail</label>
            <h3>{userData.mail}</h3>
          </div>
        </div>

        {/* parte DER*/}
        <div className={s.informationRightSide}>
          <div>
            <label htmlFor="phone">Telefono</label>
            <h3>{userData.phone}</h3>
          </div>
          <div>
            <label htmlFor="description">Descripción</label>
            <h3>{userData.description}</h3>
          </div>
          <div>
            <label htmlFor="street">Calle</label>
            <h3>{userData.street}</h3>
          </div>
          <div>
            <label htmlFor="address">Numero</label>
            <h3>{userData.address}</h3>
          </div>
          <div>
            <label htmlFor="isActive">Activo?</label>
            <div className={s.btnsContainer}>
              <input className={`${userData.isActive ? s.yesBtn : null}`} type="button" name="isActive" value='Si' onClick={handleClick}/>
              <input className={`${!userData.isActive ? s.noBtn : null}`} type="button" name="isActive" value='No' onClick={handleClick}/>
            </div>
          </div>
          <div>
            <label htmlFor="isAdmin">Admin?</label>
            <div>
              <input className={`${userData.isAdmin ? s.yesBtn : null}`} type="button" name="isAdmin" value='Si' onClick={handleClick}/>
              <input className={`${!userData.isAdmin ? s.noBtn : null}`} type="button" name="isAdmin" value='No' onClick={handleClick}/>
            </div>
          </div>
          <div>
            <label htmlFor="isBanned">Suspendido?</label>
            <div>
              <input className={`${userData.isBanned ? s.yesBtn : null}`} type="button" name="isBanned" value='Si' onClick={handleClick}/>
              <input className={`${!userData.isBanned ? s.noBtn : null}`} type="button" name="isBanned" value='No' onClick={handleClick}/>
            </div>
          </div>
          <div>
            <label htmlFor="isProfessional">Profesional?</label>
            <div>
              <input className={`${userData.isProfessional ? s.yesBtn : null}`} type="button" name="isProfessional" value='Si' onClick={handleClick}/>
              <input className={`${!userData.isProfessional ? s.noBtn : null}`} type="button" name="isProfessional" value='No' onClick={handleClick}/>
            </div>
          </div>
          <div>
            <label htmlFor="isPremium">Premium?</label>
            <div>
              <input className={`${userData.isPremium ? s.yesBtn : null}`} type="button" name="isPremium" value='Si' onClick={handleClick}/>
              <input className={`${!userData.isPremium ? s.noBtn : null}`} type="button" name="isPremium" value='No' onClick={handleClick}/>
            </div>
          </div>
          <div>
            <label htmlFor="name">Profesiones</label>
            {userData?.professions?.length && userData?.professions?.map(p => {
              return (
                <h4>{p.name}</h4>
              )
            })}
            {/* <select onClick={handleProfessionsClick} name="add-professions">
                  <option name="main-option" value=''>Selecciona profesiones</option>
              {professionFromDb?.map(p => {
                return (
                  <option name="add-professions" value={p.name}>{p.name}</option>
                )
              })}
            </select> */}
          </div>
          <button name="cancel-btn" onClick={handleEdit}>Cancelar</button>
          <input type="submit" value='Editar' />
        </div>
      </form>
    </div>
  )
}

export default EditModal;