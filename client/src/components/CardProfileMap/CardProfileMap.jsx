import React from "react";
import s from './CardProfileMap.module.scss';
import star from './assets/star.svg'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const CardProfileMap = ({order}) => {
  let allUsers = useSelector((state) => state.users.users)
  const navigate = useNavigate()
  const linkClick = () => {
    navigate('../ProfileConfig/orders')
  } 

  let professional = allUsers?.find(user => user.id === order.id_user_professional)
  console.log(professional)
    return (
        <div className={s.orders} onClick={linkClick}>
          <div className={s.imgDetail}><img src={professional?.image} alt="imagen"></img></div>
    
          <div className={s.orderDetail}>
            <h1>{professional?.name}</h1>
            <h2>{professional?.professions[0]?.name}</h2>
          </div>
          <div className={s.orderDetail2}>
            <h3>Orden: {order.id}</h3>
            {/* {professional?.rating === -1 ? '' : <h3><img src={star} alt="" /> {professional?.rating}</h3>} */}
          </div>
        </div>
    )
}

export default CardProfileMap
