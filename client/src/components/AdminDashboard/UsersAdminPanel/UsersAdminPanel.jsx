import React from "react";
import s from './UsersAdminPanel.module.scss'
import DashboardUserCard from "../UsersAdminPanel/DashboardUserCard/DashboardUserCard";
import { getAllUsersForAdmin, getUsersByIdForAdmin } from '../../../redux/adminActions'
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

function UsersAdminPanel(props) {
  //traigo estado users por props (despues lo voy a traer directo de redux)
  const { users } = props;
  const dispatch = useDispatch()
  //estado del inuput de busqueda por ID (el de nombre todavia no esta hecho)
  const [searchByIdInput, setSearchByIdInput] = useState('');

  //funcion que trae todos lo usuarios al clickear el boton.
  function getAllUsers() {
    dispatch(getAllUsersForAdmin())
  }
  //funcion onChange
  function handleSearchUserByIdChange(e) {
    setSearchByIdInput( e.target.value)
  }
  
  //funcion submit del form por ID
  function handleSearchUserByIdSubmit(e) {
    e.preventDefault()
    dispatch(getUsersByIdForAdmin(searchByIdInput));
  }

  // useEffect(() => {
  //   console.log('asd');
  //   console.log(users);

  // }, [users])

  return(
    <div>
      <form>
        <label>Buscar usuario por nombre:</label>
        <input type="text" name="name"/>
      </form>
      <form onSubmit={handleSearchUserByIdSubmit}>
        <label>Buscar usuario por ID:</label>
        <input type="text" name="user_id" onChange={handleSearchUserByIdChange}/>
        <input type="submit" value="buscar"/>
      </form>
      <button onClick={getAllUsers}>Traer todos los usuarios</button>

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