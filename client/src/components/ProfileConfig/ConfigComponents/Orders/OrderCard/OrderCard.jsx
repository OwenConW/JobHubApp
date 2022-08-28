import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import s from './OrderCard.module.scss';
import star from './assets/star.svg'
import msg from './assets/sign.svg'


//HARDCODEADO:
import userImg from './assets/userimage.jpg'
let order = { 
  name: 'Nombre 1', 
  profession: 'Diseñador', 
  rating: 4.2, 
  img: userImg, 
  date_created: "26/08/2022", 
  apointment_date: "29/08/2022", 
  description: "acordamos que me haga el corte de pelo un dia por la tarde en mi domicilio y bueno era buena onda por que me ofrecio ciertas cosas para mi cabello por lo tanto también me voy a teñir"
}
if (order.description.length > 170) {
  let description = order.description.substring(0, 170);
  order.description = description + "...";
} 

const OrderCard = () => {

  // const dispatch = useDispatch();
  // const professional = useSelector((state) => state.users.detail)
  // const { idProfessional } = prop.data.id;

  // useEffect(() => {
  //     dispatch(getCharsById(idProfessional))
  // }, [])

  // useEffect(() => {
  //     dispatch(getOrder(id_))
  // }, [])

  return (

    //HARDCODEADO
    <div className={s.orders}>
      <div className={s.imgDetail}>
        <img src={order.img} alt="imagen"></img>
      </div>
      <div className={s.orderProfessional}>
        <h1>{order.name}</h1>
        <h2>{order.profession}</h2>
        <div className={s.orderDate1}>
          <h1>Creación de Orden= {order.date_created} &nbsp; Cita= {order.apointment_date}</h1>
        </div>
        <div className={s.orderDescription}>
          <h2> {order.description} </h2>
        </div>
      </div>
      <div className={s.orderRating}>
          <h3><img src={star} /> {order.rating}</h3>
      </div>
      <div className={s.contact}>
        {/* LINK AL DETALLE DEL PROFESIONAL O CHAT ??? */}
        <button><img src={msg} alt="msg not found"/></button>
      </div>

    </div>
  )
}

export default OrderCard
