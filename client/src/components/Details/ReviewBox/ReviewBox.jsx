import React from "react";
import s from './ReviewBox.module.scss'
import CardReview from '../CardReview/CardReview.jsx'
import axios from "axios";
import noImage from "./assets/noimage.png"

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
                <img className={s.imagenPremium}src={ professional?.photo_gallery?.imagen1 || noImage} alt=""/>
                <img className={s.imagenPremium}src={ professional?.photo_gallery?.imagen2 || noImage} alt=""/>
                <img className={s.imagenPremium}src={ professional?.photo_gallery?.imagen3 || noImage} alt=""/>
                <img className={s.imagenPremium}src={ professional?.photo_gallery?.imagen4 || noImage} alt=""/>
                </>
              )
              : (
                <>
                <img className={s.imagenPremium}src={noImage} alt=""/>
                <img className={s.imagenPremium}src={noImage} alt=""/>
                <img className={s.imagenPremium}src={noImage} alt=""/>
                <img className={s.imagenPremium}src={noImage} alt=""/>
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