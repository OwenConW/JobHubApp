import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import OrderCard from './OrderCard/OrderCard';
import s from './Orders.module.scss';

const Orders = (props) => {
  return (
    <>
      <div className={s.container}>
        <h1>Mis Ordenes</h1>
        <div className={s.cardsContainer}>
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </div>
      </div>
    </> 
  );
}


export default Orders