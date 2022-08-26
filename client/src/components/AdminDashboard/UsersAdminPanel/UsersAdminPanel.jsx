import React from "react";
import s from './UsersAdminPanel.module.scss'
import DashboardUserCard from "../UsersAdminPanel/DashboardUserCard/DashboardUserCard";

function UsersAdminPanel(props) {
  const { users } = props;

  return(
    <div>
      <form>
              <label>Buscar usuario por nombre:</label>
              <input type="text" name="name"/>
            </form>
      <div className={s.cardsContainer}>
              {users?.map( u => {
                return(
                  <DashboardUserCard key={u.id} {...u} />
                )
              })}
      </div>
    </div>
  )
}

export default UsersAdminPanel;