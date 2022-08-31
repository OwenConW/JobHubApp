import React from "react";
import s from './UsersAdminPanel.module.scss'
import DashboardUserCard from "../UsersAdminPanel/DashboardUserCard/DashboardUserCard";
import { getAllUsersForAdmin, getUsersByIdForAdmin } from '../../../redux/adminActions'
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
  const [searchByFiltersInput, setSearchByFiltersInput] = useState({});

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
    //if(!searchByFiltersInput) return
  }
  

  //funcion submit del form por ID
  function handleSearchUserByIdSubmit(e) {
    e.preventDefault();
    if(!searchByIdInput) return
    dispatch(getUsersByIdForAdmin(searchByIdInput));
  }



  return(
    <div>
      {/* <form>
        <label>Buscar usuario por nombre:</label>
        <input type="text" name="name"/>
      </form> */}
      <form onSubmit={handleSearchUserByIdSubmit}>
        <label>Buscar usuario por ID:</label>
        <input type="text" name="user_id" onChange={handleSearchUserByIdChange}/>
        <input type="submit" value="buscar"/>
      </form>
      <button onClick={getAllUsers}>Traer todos los usuarios</button>
      <div>
        <h1>Buscar por Filtros</h1>
        <form onSubmit={handleSearchUserByFilterSubmit}>
          <label htmlFor="name">Nombre</label>
          <input type="text" name="name" onChange={handleSearchUserByFilter} />
          <label htmlFor="profession">Profesión</label>
          <select name="profession" onChange={handleSearchUserByFilter}>
            <option value=''>Todas las profesiones</option>
            {professions?.map( p => {
              return (
                <option value={p.name}>{p.name}</option>
              )
            })}
          </select>
          <input type="submit" value="buscar" />
        </form>
      </div>

      {
        users[0] !== '' ? 
        <div className={s.cardsContainer}>  
              {users?.map( u => {
                return(
                  <DashboardUserCard key={u.id} {...u} />
                )
              })}
      </div> :
      <h1>El usuario no existe</h1>
      }
      
    </div>
  )
}

export default UsersAdminPanel;