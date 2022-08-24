import React from "react";
import Navbar from "../Navbar/Navbar";
import Card from '../Card/Card'
import { getChars } from '../../redux/userActions';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from './AdminDashboard.module.scss'
import DashboardUserCard from "./DashboardUserCard/DashboardUserCard";

//ordenar por rating.
//buscar por nombre.
//boton para banear, eliminar.
//
//
//
//

function AdminDashboard() {

  const dispatch = useDispatch()
  //cambiar por el estado de todos los usuarios
  const users = useSelector( state => state.users.users);

  useEffect(() => {
    dispatch(getChars());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <h1>Admin Dashboard</h1>

      <div className={s.searchByNameContainer}>
        <form>
          <label>Buscar usuario por nombre:</label>
          <input type="text" name="name"/>
        </form>
        <div className={s.cardsContainer}>
          {users.map( u => {
            return(
              <DashboardUserCard key={u.id} {...u} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard;