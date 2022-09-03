import React from "react";
import s from './UsersAdminPanel.module.scss'
import DashboardUserCard from "../UsersAdminPanel/DashboardUserCard/DashboardUserCard";
import { getAllUsersForAdmin, getUsersByIdForAdmin, getUsersByFilterForAdmin } from '../../../redux/adminActions'
import { actionGetAllJobs } from '../../../redux/jobActions'
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

function UsersAdminPanel(props) {
  //traigo estado users por props (despues lo voy a traer directo de redux)
  const { users } = props;
  const dispatch = useDispatch()
  //estado del inuput de busqueda por ID (el de nombre todavia no esta hecho)
  const [searchByIdInput, setSearchByIdInput] = useState('');
  const [searchByFiltersInput, setSearchByFiltersInput] = useState({name: '', last_Name: '', profession: ''});

  const professions = useSelector(state => state.jobs.jobs)

  //TRAE PROFESSIONS DE DB
  useEffect(() => {
    dispatch(actionGetAllJobs())
  }, [dispatch])

  //funcion que trae todos lo usuarios al clickear el boton.
  function getAllUsers() {
    dispatch(getAllUsersForAdmin())
  }
  //funcion onChange
  function handleSearchUserByIdChange(e) {
    setSearchByIdInput( e.target.value)
  }
  // Onchange de busqueda por filtros
  function handleSearchUserByFilter(e){
    setSearchByFiltersInput({...searchByFiltersInput, [e.target.name]:e.target.value})
  }
  
  //funcion submit del form por ID
  function handleSearchUserByFilterSubmit(e) {
    e.preventDefault();
    if(!searchByFiltersInput) return
    dispatch(getUsersByFilterForAdmin(searchByFiltersInput))
  }

  //funcion submit del form por ID
  function handleSearchUserByIdSubmit(e) {
    e.preventDefault();
    if(!searchByIdInput) return
    dispatch(getUsersByIdForAdmin(searchByIdInput));
  }

  return(
    <div className={s.mainContainer}>
      <div className={s.filtersContainer}>
        <form className={`${s.forms} ${s.searchByIdForm}`} onSubmit={handleSearchUserByIdSubmit}>
          <label>Buscar usuario por ID:</label>
          <input type="text" name="user_id" onChange={handleSearchUserByIdChange}/>
          <input className={s.submitBtn} type="submit" value="Buscar"/>
        </form>
        <div className={s.filterByNameContainer}>
          <h1 className={s.filtersTitle}>Buscar por Filtros</h1>
          <form className={`${s.forms} ${s.filterNameForm}`} onSubmit={handleSearchUserByFilterSubmit}>
            <h3 className={s.labels}>Nombre</h3>
            <input type="text" name="name" onChange={handleSearchUserByFilter} />
            <h3 className={s.labels}>Apellido</h3>
            <input type="text" name="last_Name" onChange={handleSearchUserByFilter} />
            <h3 className={s.labels}>Profesión</h3>
            <select name="profession" onChange={handleSearchUserByFilter}>
              <option value=''>Todas las profesiones</option>
              {professions?.map( p => {
                return (
                  <option value={p.name}>{p.name}</option>
                  )
                })}
            </select>
            <input className={s.submitBtn} type="submit" value="Buscar" />
          </form>
        </div>
      </div>
        <button className={s.allUsersBtn} onClick={getAllUsers}>Traer todos los usuarios</button>
        <div className={s.divisoryLine}></div>
      {
        users[0] !== '' ? 
        <div className={s.cardsContainer}>  
              {users?.map( u => {
                return(
                  <DashboardUserCard key={u.id} {...u} />
                )
              })}
        </div> :
        <h1 className={s.noUsersFound}>El usuario no existe</h1>
      }
      
    </div>
  )
}

export default UsersAdminPanel;