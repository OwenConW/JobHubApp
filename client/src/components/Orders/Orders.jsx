import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { getLocalStorage } from '../../handlers/localStorage';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import s from './Orders.module.scss';
import Navbar from '../Navbar/Navbar';
import OrdersClient from './OrdersClient/OrdersClient';
import OrdersProfessional from './OrdersProfessional/OrdersProfessional';

const Orders = () => {
  const activeUser = getLocalStorage();
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [profOrders, setProfOrders] = useState([]);
  const [clientOrders, setClientOrders] = useState([]);


  useEffect(() => {
    const fetchOrders = async() => {
      let professional = await axios.get(`/orders/professional/${activeUser?.id}`);
      setProfOrders(professional?.data.orders.filter(p => (!p.complete && !p.allowReview)));

      let client = await axios.get(`/orders/client/${activeUser?.id}`);
      setClientOrders(client?.data.filter(c => (!c.complete && c.allowReview)));
    }

    fetchOrders();
  }, [])

  return (
    isAuthenticated ?
    <>
    <Navbar />
    <div className={s.container}>
        <div className={s.profContainer}>
          <h4>Trabajos a confirmar</h4>
            {profOrders.length ? (
              profOrders.map(prof => {
                return(
                  <OrdersProfessional order={prof} setProf={setProfOrders} profOrders={profOrders}/>
                )
              })
            ) : <p>No hay trabajos pendientes.</p>}
        </div>

        <div className={s.clientContainer}>
          <h4>Reseñas a completar</h4>
            {clientOrders.length ? (
              clientOrders.map(client => {
                return(
                  <OrdersClient order={client} setCli={setClientOrders} clientOrders={clientOrders} activeUser={activeUser}/>
                )
              })
            ) : <p>No hay reseñas pendientes.</p>}
        </div>
    </div>
    </> : navigate('/')
  )
}

export default Orders;