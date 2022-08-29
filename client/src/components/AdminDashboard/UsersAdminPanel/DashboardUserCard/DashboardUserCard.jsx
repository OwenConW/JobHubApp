import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, restoreUser, getAllUsersForAdmin, actionFetchingAdminDeleteUserReset, editUser } from '../../../../redux/adminActions'
import EditModal from "../DashboardUserCard/EditModal/EditModal";
import s from './DashboardUserCard.module.scss';

function DashboardUserCard(props) {
  const {   id,
            name, 
            last_Name, 
            description, 
            dni, 
            image, 
            date_of_Birth, 
            mail,
            phone, 
            country, 
            city, 
            rating, 
            street,
            address,
            isPremium, 
            isProfessional, 
            isAdmin, 
            isBanned, 
            isActive, 
            professions } = props;

  //estado que abre y cierra los DETALLES de la card.
  const [openModal, setOpenModal] = useState(false);
  //estado que abre y cierra el MODAL de edicion de usuario.
  const [editModalActive, setEditModalActive] = useState(false)

  const dispatch = useDispatch();

  //funcion que cambia el estado del DETALLE de usuario
  function handleOpenModal(e) {
    setOpenModal(!openModal)
  }

  //funcion que elimina
  function handleDelete(e){
    dispatch(deleteUser(id))
  }

  //Funcion para "restaurar" el usuario "eliminado"(professions esta hardcodeado porque no hice para que se pueda seleccionar todavia)
  function handleRestore(e){
    dispatch(restoreUser(id))
  }
  
  //funcion que cambia el estado del MODAL DE EDICION de usuario
  function handleEditOpenModal(e){
    setEditModalActive(!editModalActive)
  }

  // useEffect(() => {
  //   dispatch(actionFetchingAdminDeleteUserReset())
  // }, [dispatch, props])

  return (
    <div className={`${s.cardContainer} ${openModal ? s.openModal : null}`}>
      {editModalActive? <EditModal handleEditOpenModal={handleEditOpenModal} editModalActive={editModalActive} {...props}/> : null}
      <div className={s.importantInformationContainer}>
        <button onClick={handleOpenModal}>Detalles</button>
        <div className={s.nameContainer}>
          <h1>Nombre</h1>
          <h1>{name} {last_Name}</h1>
        </div>
        <div>
          <h4>Premium</h4>
          <h4>{isPremium ? "Si" : "No"}</h4>
        </div>
        <div>
          <h4>Admin</h4>
          <h4>{isAdmin ? "Si": "No"}</h4>
        </div>
        <div>
          <h4>Activo</h4>
          <h4>{isActive ? "Si" : "No"}</h4>
        </div>
        <div>
          <h4>Profesional</h4>
          <h4>{isProfessional ? "Si" : "No"}</h4>
        </div>
        <div>
          <h4>Suspendido</h4>
          <h4>{isBanned ? "Si" : "No"}</h4>
        </div>
        <div>
          <h4>Rating</h4>
          <h4>{rating === -1 ? "No tiene" : rating}</h4>
        </div>
        {
        isActive ? <button className={s.deleteBtn} onClick={handleDelete}>Eliminar</button> :
                   <button className={s.restoreBtn} onClick={handleRestore}>Restaurar</button>
        }
        <button className={s.editBtn} onClick={handleEditOpenModal}>Editar</button>
      </div>
      {/* Division */}
      <div className={s.notSoRelevantInformationContainer}>
        <div>
          <h4>DNI</h4>
          <h4>{dni}</h4>
        </div>
        <div>
          <h4>Fecha de nacimiento</h4>
          <h4>17/03/1999{date_of_Birth}</h4>
        </div>
        <div>
          <h4>Emai</h4>
          <h4>{mail}</h4>
        </div>
        <div>
          <h4>Telefono</h4>
          <h4>{phone}</h4>
        </div>
        <div>
          <h4>Pais</h4>
          <h4>{country}</h4>
        </div>
        <div>
          <h4>Ciudad</h4>
          <h4>{city}</h4>
        </div>
        <div>
          <h4>Calle</h4>
          <h4>{street}</h4>
        </div>
        <div>
          <h4>numero</h4>
          <h4>{address}</h4>
        </div>
        {/* <div>
          <p>Description</p>
          <p>{description}</p>
        </div> */}
        <div>
        <h4>Profesiones</h4>
        <h4>{professions?.map(p => {
          return (
            <h4>{p.name}</h4>
          )
        })}
        </h4>
        </div>
        
      </div>
    </div>
  )
}

export default DashboardUserCard;