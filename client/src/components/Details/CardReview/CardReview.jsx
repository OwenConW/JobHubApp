import React from "react";
import s from './CardReview.module.scss';
import userImg from './assets/userimage.jpg'
import star from './assets/star.svg'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getChars } from "../../../redux/userActions";
import noUserImg from '../../FeaturedCard/assets/default_user.png'

let order = {}
const CardReview = ({ dataObj, reviewer }) => {
  const data = dataObj

  console.log('reviewer:', reviewer)
  return (


    <div className={s.orders}>
      <div className={s.imgDetail}>
        <img src={reviewer?.image} alt={noUserImg}></img>
      </div>

      <div className={s.orderDetail}>
        <h1>{reviewer?.name} {reviewer?.last_Name}</h1>
        <h2>{data?.feedback_client}</h2>
      </div>

      <div className={s.orderDetail2}>
        <h3><img src={star} /> {data.rating}</h3>
      </div>
    </div>

  )
}

export default CardReview

