import React, { useEffect } from "react";
import { useState } from "react";
import EditModal from "../DashboardUserCard/EditModal/EditModal";
import DeleteUserModal from "../DashboardUserCard/DeleteUserModal/DeleteUserModal";
import RestoreUserModal from "../DashboardUserCard/RestoreUserModal/RestoreUserModal";
import s from './DashboardUserCard.module.scss';
import { modifyUserStatus } from '../../../../redux/adminActions'
import { useDispatch } from "react-redux";

function DashboardUserCard(props) {
  const dispatch = useDispatch()
  const {   id,
            name, 
            last_Name, 
            description, 
            dni, 
            // eslint-disable-next-line no-unused-vars
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
            profession } = props;

  //estado que abre y cierra los DETALLES de la card.
  const [openModal, setOpenModal] = useState(false);
  //estado que abre y cierra el MODAL de edicion de usuario.
  const [editModalActive, setEditModalActive] = useState(false)
  const [DeleteModalActive, setDeleteModalActive] = useState(false)
  const [RestoreModalActive, setRestoreModalActive] = useState(false)

  //funcion que cambia el estado del DETALLE de usuario
  function handleOpenModal(e) {
    setOpenModal(!openModal)
  }

  function handleModifyStatus(e) {
    dispatch(modifyUserStatus(e.target.value, id, {[e.target.name]: !props[e.target.name]} ))
  }

  function handleDeleteOpenModal(e) {
    setDeleteModalActive(!DeleteModalActive)
  }

  //Funcion para "restaurar" el usuario "eliminado"(professions esta hardcodeado porque no hice para que se pueda seleccionar todavia)
  function handleRestoreOpenModal(e){
    setRestoreModalActive(!RestoreModalActive)
  }

  
  //funcion que cambia el estado del MODAL DE EDICION de usuario
  function handleEditOpenModal(e){
    setEditModalActive(!editModalActive)
  }

  return (
    <div className={`${s.cardContainer} ${openModal ? s.openModal : null}`}>
      {editModalActive? <EditModal handleEditOpenModal={handleEditOpenModal} editModalActive={editModalActive} {...props}/> : null}
      {DeleteModalActive? <DeleteUserModal handleDeleteOpenModal={handleDeleteOpenModal} DeleteModalActive={DeleteModalActive} {...props}/> : null}
      {RestoreModalActive? <RestoreUserModal handleRestoreOpenModal={handleRestoreOpenModal} RestoreModalActive={RestoreModalActive} {...props}/> : null}
      <div className={s.importantInformationContainer}>
        <button className={s.detailsBtn} onClick={handleOpenModal}>Detalles</button>
        <div>
          <h3>ID</h3>
          <h3>{id}</h3>
        </div>
        <div className={s.nameContainer}>
          <h1>Nombre</h1>
          <h1>{name} {last_Name}</h1>
        </div>
        <div>
          <button className={s.statusBtn} onClick={handleModifyStatus} value='premium' name="isPremium">Premium</button>
          <h4 className={isPremium ? s.yesStatus : s.noStatus}>{isPremium ? "Si" : "No"}</h4>
        </div>
        <div>
          <button className={s.statusBtn} onClick={handleModifyStatus} value='updateadmin' name="isAdmin">Admin</button>
          <h4 className={isAdmin ? s.yesStatus : s.noStatus}>{isAdmin ? "Si": "No"}</h4>
        </div>
        <div>
          <button className={s.statusBtn} onClick={handleModifyStatus} value='destroy' name="isActive">Activo</button>
          <h4 className={isActive ? s.yesStatus : s.noStatus}>{isActive ? "Si" : "No"}</h4>
        </div>
        <div>
          <button className={s.statusBtn} onClick={handleModifyStatus} value='professional' name='isProfessional'>Profesional</button>
          <h4 className={isProfessional ? s.yesStatus : s.noStatus}>{isProfessional ? "Si" : "No"}</h4>
        </div>
        <div>
          <button className={s.statusBtn} onClick={handleModifyStatus} value='banned' name='isBanned'>Suspendido</button>
          <h4 className={isBanned ? s.yesStatus : s.noStatus}>{isBanned ? "Si" : "No"}</h4>
        </div>
        <div>
          <h4>Rating</h4>
          <h4>{rating === -1 ? "No tiene" : rating}</h4>
        </div>
        {
        isActive ? <button className={s.deleteBtn} onClick={handleDeleteOpenModal}>Eliminar</button> :
                   <button className={s.restoreBtn} onClick={handleRestoreOpenModal}>Restaurar</button>
        }
        <button className={s.editBtn} onClick={handleEditOpenModal}>Editar</button>
      </div>
      {/* Division */}
      <div className={s.notSoRelevantInformationContainer}>
        <div className={s.userDataContainer}>
          <div className={s.dniEmailContainer}>
            <div>
              <h4>DNI</h4>
              <h4>{dni}</h4>
            </div>
            <div>
              <h4>Email</h4>
              <h4>{mail}</h4>
            </div>
          </div>
          <div className={s.birthDatePhoneContainer}>
            <div>
              <h4>Fecha de nacimiento</h4>
              <h4>17/03/1999{date_of_Birth}</h4>
            </div>
            <div>
              <h4>Telefono</h4>
              <h4>{phone}</h4>
            </div>
          </div>
        </div>
        <div className={s.userLocationContainer}>
          <div className={s.countryCityContainer}>
            <div>
              <h4>Pais</h4>
              <h4>{country}</h4>
            </div>
            <div>
              <h4>Ciudad</h4>
              <h4>{city}</h4>
            </div>
          </div>
          <div className={s.addressContainer}>
            <div>
              <h4>Calle</h4>
              <h4>{street}</h4>
            </div>
            <div>
              <h4>numero</h4>
              <h4>{address}</h4>
            </div>
          </div>
        </div>
        <div className={s.description}>
          <h4>Description</h4>
          <p>{description}</p>
        </div>
        <div>
        <h4>Profesiones</h4>
        <h4>{profession?.map(p => {
          return (
            <h4>{p}</h4>
          )
        })}
        </h4>
        </div>
      </div>
    </div>
  )
}

export default DashboardUserCard;