import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, actionFetchingAdminEditUserReset } from "../../../../../redux/adminActions";
import { actionGetAllJobs } from '../../../../../redux/jobActions'
import Swal from 'sweetalert2'
import s from './EditModal.module.scss';


function EditModal(props) {
  const {id, name, last_Name, description, dni, date_of_birth, mail, phone, country, city, street, address, coordinate, isProfessional,rating, image, profession, editModalActive, handleEditOpenModal } = props;
  //estado de los datos a enviar a la DB, (profession harcodeado por la misma razon que en el handleRestore)
  const [userData, setUserData] = useState({id, name, last_Name, description, dni, date_of_birth, mail, phone, coordinate, isProfessional, image, country, city, street, address, rating, profession})
  const dispatch = useDispatch()
  const professionFromDb = useSelector( state => state.jobs.jobs)

  //ESTADOS DE HANDLING DE EXITO Y ERROR PARA LA EDICION DE USUARIO
  const fetchingAdminEditUserSuccess = useSelector(state => state.fetching.fetchingAdminEditUserSuccess)
  const fetchingAdminEditUserFailure = useSelector(state => state.fetching.fetchingAdminEditUserFailure)

  //CAMBIA EL ESTADO DE LOS INPUTS (userData), pero para botones.
  function handleInputChange(e) {
    if (e.target.name === 'add-profession') {
      if (userData.profession.includes(e.target.value) || e.target.value === '') return
      return setUserData({...userData, profession: [...userData.profession, e.target.value]})
    }
    setUserData({...userData, [e.target.name]: e.target.value})
  }

  function handleRemoveProfession(e) {
    setUserData({...userData, profession: userData.profession.filter(p => p !== e.target.value)})
  }

  //funcion onSubmit
  function handleEdit(e){
    if(e.target.name === "cancel-btn") return handleEditOpenModal(!editModalActive) 
    e.preventDefault()
    console.log(userData.profession);
    dispatch(editUser(userData.id , userData))
  }
  
  //Success y Error handler del Edit
  useEffect(() => {
    if (fetchingAdminEditUserSuccess) {
      handleEditOpenModal(!editModalActive)   
      Swal.fire({
        icon: 'success',
        title: 'El usuario ha sido modificado correctamente.',
        showConfirmButton: false,
        timer: 2200,
        position: 'top-end',
        backdrop: false,
      })
    } else if(fetchingAdminEditUserFailure) {
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error al modificar el usuario.',
        showConfirmButton: false,
        timer: 2200,
        position: 'top-end',
        backdrop: false,
      })
    }
    dispatch(actionFetchingAdminEditUserReset())
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <input type="text" name='name' value={userData.name} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="last_Name">Apellido</label>
            <input type="text" name='last_Name' value={userData.last_Name} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="dni">DNI</label>
            <input type="text" name='dni' value={userData.dni} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="date_of_birth">Fecha de nacimiento</label>
            <input type="text" name='date_of_birth' value={userData.date_of_birth} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="rating">Rating</label>
            <h3>{userData.rating}</h3>
          </div>
          <div>
            <label htmlFor="country">Pais</label>
            <input type="text" name='country' value={userData.country} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="city">Ciudad</label>
            <input type="text" name='city'value={userData.city} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="mail">Mail</label>
            <input type="text" name='mail' value={userData.mail} onChange={handleInputChange} />
          </div>
        </div>

        {/* parte DER*/}
        <div className={s.informationRightSide}>
          <div>
            <label htmlFor="phone">Telefono</label>
            <input type="text" name='phone' value={userData.phone} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="description">Descripción</label>
            <input type="text" name='description' value={userData.description} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="street">Calle</label>
            <input type="text" name='street' value={userData.street} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="address">Numero</label>
            <input type="text" name='address' value={userData.address} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="name">Profesiones</label>
            {userData.profession.length ? userData?.profession?.length && userData?.profession?.map(p => {
              return (
                <button onClick={handleRemoveProfession} value={p}>{p}</button>
              )
            }) : <h4>No tiene</h4>}
            <select onClick={handleInputChange} name="add-profession">
                  <option name="main-option" value=''>Selecciona profesiones</option>
              {professionFromDb?.map(p => {
                return (
                  <option name="add-profession" value={p.name}>{p.name}</option>
                )
              })}
            </select>
          </div>
          <div>
            <input className={s.editBtn} type="submit" value='Editar' />
            <button className={s.cancelBtn} name="cancel-btn" onClick={handleEdit}>Cancelar</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditModal;