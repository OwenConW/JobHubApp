import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { getLocalStorage } from '../../handlers/localStorage';
import s from './OrderForm.module.scss';

const OrderForm = () => {
  const activeUser = getLocalStorage();
  const [edit, setEdit] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async() => {
      let response = await axios.get(`/users/${activeUser?.id}`);
      setOrders(
        [...response.data.orders]
      )
    }

    fetchOrders();
  }, [])

  console.log(orders);

  return (
    <div className={s.container}>
        {edit ? (
          orders?.map(order => <p>{order.id_user_client}</p>)
        ) : <></>}
    </div>
  )
}

export default OrderForm;