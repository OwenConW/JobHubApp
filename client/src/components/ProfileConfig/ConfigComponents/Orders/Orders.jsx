import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import OrderCard from './OrderCard/OrderCard';

const Orders = (props) => {
  return (
    <>
      <OrderCard />
      <OrderCard />
      <OrderCard />
    </> 
  );
}


export default Orders