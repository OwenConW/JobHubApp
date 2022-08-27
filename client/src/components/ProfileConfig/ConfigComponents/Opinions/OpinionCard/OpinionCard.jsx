import React from "react"
import { useState } from "react"
import s from './OpinionCard.module.scss'
import saveImg from './assets/Save2.png'
import { changeReview } from "../../../../../redux/userActions"



const OpinionCard = ({review, users}) => {

  review = review


  let professional = users?.find(user => user.id === review?.id_user_professional)
  if(professional){
    professional ={...professional, name:professional.name[0].toUpperCase() + professional.name.substring(1)} 
  }
  
  const [modifiedReview, setModifiedReview] = useState({
    id_orders: review?.id_orders,
    id_user_client: review?.id_user_client,
    id_user_professional: review?.id_user_professional,
    feedback_client: review?.feedback_client,
    rating: review?.rating
  })

  const handleChange = (event) => {
    setModifiedReview({
      ...modifiedReview,
      [event.target.name]: event.target.value
    })
   
  }

  const handleSubmit = () => {
    let sendInfo = {
      feedback_client: modifiedReview?.feedback_client,
      rating: modifiedReview?.rating,
      id_user_professional: parseInt(modifiedReview?.id_user_professional)
    }
    console.log('sendInfo', sendInfo);
    changeReview(modifiedReview.id_orders , sendInfo);
  }


  return (
    <div className={s.allReviews} key={review?.id_orders}>
      <div className={s.leftInfo}>
        {
          professional ? <h1>{professional.name}</h1> : <h1>-</h1>
        }
        
        <textarea name='feedback_client' onChange={(event) => handleChange(event)}value={modifiedReview.feedback_client}></textarea>
      </div>
      <div className={s.rightInfo}>
        <h2>Orden: {review?.id_orders}</h2>

        <div>
          <h2>Calificacion: {modifiedReview.rating}</h2>
          <input
            name="rating"
            max="5"
            step="0.5"
            type="range"
            value={modifiedReview.rating} onChange={(event) => handleChange(event)}></input>
        </div>


      </div>
      <div className={s.submitChanges} onClick={handleSubmit}>
        <img src={saveImg}></img>
      </div>
    </div>
  )

}

export default OpinionCard