import React from "react";
import s from './UsersAdminPanel.module.scss'
import DashboardUserCard from "../UsersAdminPanel/DashboardUserCard/DashboardUserCard";
import { getAllUsersForAdmin, getUsersByIdForAdmin } from '../../../redux/adminActions'
import { useDispatch } from "react-redux";
import { useState } from "react";

function UsersAdminPanel(props) {
  const { users } = props;
  const dispatch = useDispatch()

  const [searchByIdInput, setSearchByIdInput] = useState('');

  function getAllUsers() {
    dispatch(getAllUsersForAdmin())
  }

  function handleSearchUserByIdChange(e) {
    setSearchByIdInput(e.target.value)
  }
  
  function handleSearchUserByIdSubmit(e) {
    e.preventDefault()
    dispatch(getUsersByIdForAdmin(searchByIdInput));
  }

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
        
        <div className={s.cardsContainer}>  
              {users?.map( u => {
                return(
                  <DashboardUserCard key={u.id} {...u} />
                )
              })}
      </div> 
      }
      
    </div>
  )
}

export default UsersAdminPanel;