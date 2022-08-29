import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import OrderCard from './OrderCard/OrderCard';
import s from './Orders.module.scss';
import { getLocalStorage } from "../../../../handlers/localStorage";

const Orders = (props) => {
  let activeUser = getLocalStorage()

  let users = useSelector((state) => state.users.users)
  let saveAllOrders = useSelector((state) => state.orders.orders)
  const [myOrders, setMyOrders] = useState(saveAllOrders)

//FILTRADO POR NOMBRE
const [filter, setFilter] = useState('')

const filterByName = (filter) => {
  let filteredProfessionals;
  let filteredOrders = myOrders

  if (filter) {
    filteredOrders = []
    filteredProfessionals = users.filter(prof => prof.name.toLowerCase().includes(filter.toLowerCase()) || prof.last_Name.toLowerCase().includes(filter.toLowerCase()))
    for (let x = 0; x < filteredProfessionals.length; x++) {
      let filteredProfessional = filteredProfessionals[x];
      let ordersForFilteredProfessional = saveAllOrders.filter(review => review.id_user_professional == filteredProfessional.id);
      ordersForFilteredProfessional.forEach(review => filteredOrders.push(review))
    }
    setMyOrders(filteredOrders)
  } else {
    setMyOrders(saveAllOrders)
  }
}

const onFilterChange = (event) => {
  setFilter(event.target.value)
}

useEffect(() => {
  console.log(myOrders)
  filterByName(filter)
}, [filter])


  return (
    <div className={s.container}>
      <label>Filtrar</label>
      <input name="filter" value={filter} onChange={event => onFilterChange(event)}></input>
      {
        myOrders.length ? myOrders.map(order =>
          <OrderCard order={order} users={users} key={order?.id}/>

        ) : <p>No se encontraron reseñas</p>
      }

    </div>
  );
}


export default Orders