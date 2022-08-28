import React from "react";
import s from './CardProfileMap.module.scss';
import userImg from './assets/userimage.jpg'
import star from './assets/star.svg'
import { useSelector } from "react-redux";

// let order = { name: 'Nombre 1', profession: 'Diseñador', rating: 4.2, img: userImg}

const CardProfileMap = ({order}) => {
  let allUsers = useSelector((state) => state.users.users)

  let professional = allUsers?.find(user => user.id === order.id_user_professional)
  console.log(professional)
    return (
        <div className={s.orders}>
          <div className={s.imgDetail}><img src={professional?.image} alt="imagen"></img></div>
    
          <div className={s.orderDetail}>
            <h1>{professional?.name}</h1>
            <h2>{professional?.professions[0]?.name}</h2>
          </div>
          <div className={s.orderDetail2}>
            <h3><img src={star} /> {professional?.rating}</h3>
          </div>
        </div>
    )
}

export default CardProfileMap
