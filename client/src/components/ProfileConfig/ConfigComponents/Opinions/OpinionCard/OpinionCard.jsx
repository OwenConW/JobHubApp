import React from "react"
import { useState } from "react"
import s from './OpinionCard.module.scss'
import Loader from "../../../../Login/Loader/Loader"
import { changeReview } from "../../../../../redux/userActions"
import Swal from "sweetalert2"



const OpinionCard = ({review, users}) => {

  review = review


  let professional = users?.find(user => user.id === review?.id_user_professional)
  if(professional){
    professional ={...professional, name:professional.name[0].toUpperCase() + professional.name.substring(1)} 
  }
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [modifiedReview, setModifiedReview] = useState({
    id_orders: review?.id_orders,
    id_user_client: review?.id_user_client,
    id_user_professional: review?.id_user_professional,
    feedback_client: review?.feedback_client,
    rating: review?.rating
  })

  const handleChange = (event) => {
    setError('');
    setModifiedReview({
      ...modifiedReview,
      [event.target.name]: event.target.value
    })
   
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let sendInfo = {
      feedback_client: modifiedReview?.feedback_client,
      rating: modifiedReview?.rating,
      id_user_professional: parseInt(modifiedReview?.id_user_professional)
    }
    console.log('sendInfo', sendInfo);
    changeReview(modifiedReview.id_orders , sendInfo);

    Swal.fire({
      icon: 'success',
      title: 'Cambios Guardados',
      showConfirmButton: false,
      timer: 1500
    })
  }

  const [onReview, setOnReview] = useState(false);

  const handleReview = () =>{
    onReview ? setOnReview(false) : setOnReview(true);
}

  return (

    <div className={onReview ? s.review : s.order} key={professional?.id}>
    <div className={s.info}>
        <div className={s.img}>
            <img src={professional?.image} alt="" />
        </div>
        <div className={s.userdata}>
            <p className={s.name}>{professional?.name} {professional?.last_Name}</p>
            <p className={s.location}>{professional?.city}, {professional?.country}</p>
        </div>
        <div className={s.btndiv}>
            <div className={s.btn} onClick={handleReview}>Puntuar</div>
        </div>
    </div>
    <div className={s.opinion}>
      <form className={s.form}>
      <div className={s.inputs}>
      <div className={s.description}>
            <label>Description</label>
            <textarea name='feedback_client' value={modifiedReview.feedback_client} onChange={event => handleChange(event)}></textarea>
        </div>
        <div className={s.barra}>
            <label>Puntaje</label>
            <p>{modifiedReview.rating}</p>
            <input
                name="rating"
                max="5"
                step="0.5"
                type="range"
                value={modifiedReview.rating}
                onChange={event => handleChange(event)}
/>
        </div>
        </div>
        <div className={s.submit}>
                    {loading ? <Loader/> : <button className={s.btnSubmit} onClick={handleSubmit} type='submit'>Enviar reseña</button>}
                    {error ? <p>{error}</p> : ''}
        </div>
        </form>
    </div>
</div>

    // <div className={s.allReviews} key={review?.id_orders}>
    //   <div className={s.leftInfo}>
    //     {
    //       professional ? <h1>{professional.name}</h1> : <h1>-</h1>
    //     }
        
    //     <textarea name='feedback_client' onChange={(event) => handleChange(event)}value={modifiedReview.feedback_client}></textarea>
    //   </div>
    //   <div className={s.rightInfo}>
    //     <h2>Orden: {review?.id_orders}</h2>

    //     <div>
    //       <h2>Calificacion: {modifiedReview.rating}</h2>
    //       <input
    //         name="rating"
    //         max="5"
    //         step="0.5"
    //         type="range"
    //         value={modifiedReview.rating} onChange={(event) => handleChange(event)}></input>
    //     </div>


    //   </div>
    //   <div className={s.submitChanges} onClick={handleSubmit}>
    //     <img src={saveImg}></img>
    //   </div>
    // </div>
  )

}

export default OpinionCard