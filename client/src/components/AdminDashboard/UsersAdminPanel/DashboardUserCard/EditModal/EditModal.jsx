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

  const professionFromDb = useSelector(state => state.jobs.jobs)
  //ESTADOS DE HANDLING DE EXITO Y ERROR PARA LA EDICION DE USUARIO
  const fetchingAdminEditUserSuccess = useSelector(state => state.fetching.fetchingAdminEditUserSuccess)
  const fetchingAdminEditUserFailure = useSelector(state => state.fetching.fetchingAdminEditUserFailure)

  //CAMBIA EL ESTADO DE LOS INPUTS (userData)
  function handleChange(e){
    setUserData({...userData, [e.target.name]: e.target.value})
  }
  
  //CAMBIA EL ESTADO DE LOS INPUTS (userData), pero para botones.
  function handleClick(e) {
    setUserData({...userData, [e.target.name]: e.target.value === "Si" ? true : false})
  }

  function handleProfessionsClick(e) {
    console.log('aiuda');
  }

  //funcion onSubmit
  function handleEdit(e){
    if(e.target.name === "cancel-btn") return handleEditOpenModal(!editModalActive) 
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
            <input type="text" name="name" value={userData.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="last_Name">Apellido</label>
            <input type="text" name="last_Name" value={userData.last_Name} onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="dni">DNI</label>
            <input type="text" name="dni" value={userData.dni} onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="date_of_birth">Fecha de nacimiento</label>
            <input type="text" name="date_of_birth" value={userData.date_of_birth} onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="rating">Rating</label>
            <h4>{userData.rating === -1 ? "No tiene" : userData.rating}</h4>
          </div>
          <div>
            <label htmlFor="country">Pais</label>
            <input type="text" name="country" value={userData.country} onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="city">Ciudad</label>
            <input type="text" name="city" value={userData.city} onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="mail">Mail</label>
            <input type="text" name="mail" value={userData.mail} onChange={handleChange}/>
          </div>
        </div>

        {/* parte DER*/}
        <div className={s.informationRightSide}>
          <div>
            <label htmlFor="phone">Telefono</label>
            <input type="text" name="phone" value={userData.phone} onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="description">Descripción</label>
            <input type="textarea" name="description" value={userData.description} onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="street">Calle</label>
            <input type="text" name="street" value={userData.street} onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="address">Numero</label>
            <input type="text" name="address" value={userData.address} onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="isActive">Activo?</label>
            <div className={s.btnsContainer}>
              <input type="button" name="isActive" value='Si' onClick={handleClick}/>
              <input type="button" name="isActive" value='No' onClick={handleClick}/>
            </div>
          </div>
          <div>
            <label htmlFor="isAdmin">Admin?</label>
            <div>
              <input type="button" name="isAdmin" value='Si' onClick={handleClick}/>
              <input type="button" name="isAdmin" value='No' onClick={handleClick}/>
            </div>
          </div>
          <div>
            <label htmlFor="isBanned">Suspendido?</label>
            <div>
              <input type="button" name="isBanned" value='Si' onClick={handleClick}/>
              <input type="button" name="isBanned" value='No' onClick={handleClick}/>
            </div>
          </div>
          <div>
            <label htmlFor="isProfessional">Profesional?</label>
            <div>
              <input type="button" name="isProfessional" value='Si' onClick={handleClick}/>
              <input type="button" name="isProfessional" value='No' onClick={handleClick}/>
            </div>
          </div>
          <div>
            <label htmlFor="isPremium">Premium?</label>
            <div>
              <input type="button" name="isPremium" value='Si' onClick={handleClick}/>
              <input type="button" name="isPremium" value='No' onClick={handleClick}/>
            </div>
          </div>
          <div>
            <label htmlFor="name">Profesiones</label>
            {userData.length && userData?.professions?.map(p => {
              return (
                <h4>{p}</h4>
              )
            })}
            <select onClick={handleProfessionsClick} name="add-professions">
                  <option name="main-option" value=''>Selecciona profesiones</option>
              {professionFromDb?.map(p => {
                return (
                  <option name="add-professions" value={p.name}>{p.name}</option>
                )
              })}
            </select>
          </div>
          <button name="cancel-btn" onClick={handleEdit}>Cancelar</button>
          <input type="submit" value='Editar' />
        </div>
      </form>
    </div>
  )
}

export default EditModal;