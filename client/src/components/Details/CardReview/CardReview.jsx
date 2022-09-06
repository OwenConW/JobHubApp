import React from "react";
import s from './CardReview.module.scss';
import star from './assets/star.svg'

const CardReview = ({ dataObj, reviewer }) => {
  const data = dataObj
  
  return (
    <div className={s.orders}>
      <div className={s.imgDetail}>
        <img src={reviewer?.image} alt=""></img>
      </div>

      <div className={s.orderDetail}>
        <h1>{reviewer?.name} {reviewer?.last_Name}</h1>
        <h2>{data?.feedback_client}</h2>
      </div>

      <div className={s.orderDetail2}>
        <h3><img src={star} alt=""/> {data.rating}</h3>
      </div>
    </div>

  )
}

export default CardReview

