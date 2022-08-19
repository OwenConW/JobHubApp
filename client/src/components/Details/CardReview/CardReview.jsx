import React from "react";
import s from './CardReview.module.scss';
import userImg from './assets/userimage.jpg'
import star from './assets/star.svg'

let order = { name: 'Nombre 1', description: 'Diseñador asdasd asdasd asdasds adsadas dasdasdsdasd asdasdsad', rating: 4.2, img: userImg }

const CardReview = () => {
  return (
    <div className={s.orders}>
      <div className={s.imgDetail}>
        <img src={order.img} alt="imagen"></img>
      </div>

      <div className={s.orderDetail}>
        <h1>{order.name}</h1>
        <h2>{order.description}</h2>
      </div>
      <div className={s.orderDetail2}>
        <h3><img src={star} /> {order.rating}</h3>
      </div>
    </div>
  )
}

export default CardReview
