import React from "react"
import { useSelector } from "react-redux"
import star from './assets/star.svg'
import noUserImg from './assets/userimage.jpg'
import s from './RevCards.module.scss'


const RevCards = (review) => {
    review = review.review
    let users = useSelector((state) => state.users.users)
    let reviewer = users.find(user => user.id === review.id_user_client) 
    console.log(reviewer)

return (
    <div className={s.orders} >
      <div className={s.imgDetail}>
        {
          reviewer ? <img src={reviewer.image} alt="imagen"></img> : <img src={noUserImg}></img>
        }
      </div>

      <div className={s.orderDetail}>
        {
          reviewer ? <h1>{reviewer.name} {reviewer.last_Name}</h1> : <h1>Usuario anonimo</h1>
        }

        <h2>{review.feedback_client}</h2>
      </div>
      <div className={s.orderDetail2}>
      <h3><img src={star} />{review.rating}</h3>
      </div>
    </div>
  )
}

export default RevCards