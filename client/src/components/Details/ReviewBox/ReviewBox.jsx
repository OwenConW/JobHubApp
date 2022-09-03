import React from "react";
import s from './ReviewBox.module.scss'
import CardReview from '../CardReview/CardReview.jsx'

const ReviewBox = ({professional, allUsers}) => {
  return (
    <div className={s.professionList}>
      {
        professional?.isPremium ? (
            <>
            {
              professional?.photo_gallery.imagen1 !== null || professional?.photo_gallery.imagen2 !== null || professional?.photo_gallery.imagen3 !== null || professional?.photo_gallery.imagen4 !== null 
              ? (
                <>
                {
                  professional?.photo_gallery?.imagen1 && <img className={s.imagenPremium}src={ professional?.photo_gallery?.imagen1} alt=""/>
                }
                {
                  professional?.photo_gallery?.imagen2 &&  <img className={s.imagenPremium}src={ professional?.photo_gallery?.imagen2} alt=""/>
                }
                {
                  professional?.photo_gallery?.imagen3 && <img className={s.imagenPremium}src={ professional?.photo_gallery?.imagen3} alt=""/>
                }
                {
                  professional?.photo_gallery?.imagen4 && <img className={s.imagenPremium}src={ professional?.photo_gallery?.imagen4} alt=""/>
                }
                </>
              )
              : (
                <>
                  <h1>El profesional todavia no subio sus trabajos</h1>
                </>
              )
            } 
            </>
        ) : (
          <>
          {
            professional?.reviews?.map(review => {
                    let reviewer = allUsers.find(user => user.id === review.id_user_client)
                    return (
                    <CardReview dataObj={review} reviewer={reviewer} key={review.id_orders}/>
                  )})
          }
          </>
        )
      }
    </div>
  )
}

export default ReviewBox