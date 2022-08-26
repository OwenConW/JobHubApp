import React from "react";
import s from './OtherReviews.module.scss'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorage } from "../../../../handlers/localStorage";
import { getChars, getCharsById } from "../../../../redux/userActions";
import CardReview from "../../../Details/CardReview/CardReview";
import RevCards from "./RevCards/RevCards";
const OtherReviews = () => {
  const dispatch = useDispatch()
  let activeUser = getLocalStorage()

  let allReviews = [{ id_orders: 7, id_user_client: 1, id_professional: 3, feedback_client: 'Buenardo el trabajo', rating: 3 }, { id_orders: 8, id_user_client: 1, id_professional: 2, feedback_client: 'Un asco', rating: 1 }, { id_orders: 9, id_user_client: 1, id_professional: 3, feedback_client: 'Buenardo el trabajo', rating: 3 }, { id_orders: 10, id_user_client: 1, id_professional: 3, feedback_client: 'Buenardo el trabajo', rating: 3 }]

  let users = useSelector((state) => state.users.users)

  console.log(allReviews[0])
  useEffect(() => {

  }, [users])

  const setRating = (event) => {
    console.log(parseInt(event.target.id))
  }

  const onChange = (event) => {

  }


  // let allReviews = users.map(user => user.reviews)
  // console.log(users)
  return (
    <div className={s.container}>
      <label>Filtrar</label>
      <input></input>
      {
        allReviews ? allReviews.map(review => 
          
            <RevCards review={review}/>
        ) : <p>Aun no han hecho ninguna reseña sobre ti</p>
      }

    </div>
  )
}

export default OtherReviews