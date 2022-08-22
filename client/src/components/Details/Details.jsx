import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import s from './Details.module.scss';
import userImg from './assets/userimage.jpg'

import Navbar from "../Navbar/Navbar";
import CardReview from './CardReview/CardReview.jsx'
import ProfessionBox from "../ProfessionBox/ProfessionBox";
import ReviewBox from "./ReviewBox/ReviewBox.jsx"
import { getCharsById } from '../../redux/userActions';
import { useParams } from "react-router-dom";
import defaultimage from './assets/deafultimage.png';



const Profile = () => {

let params = useParams();


  const dispatch = useDispatch();

  const professional = useSelector((state) => state.users.detail)
  const id = params.id
  
  useEffect(() => {
    dispatch(getCharsById(id))
  }, [])

  // console.log('professional: ', professional)

  return (
    <>
      <Navbar />
      {/*----- CONTENEDOR IZQUIERDO -----*/}
      <div className={s.container}>
        <div className={s.leftContainer}>
          <div className={s.profileInfo}>
            <div className={s.profile_Img_container}>
              {professional.image ? <img src={professional.image} className={s.profile_Img}/> : <img src={defaultimage} className={s.profile_Img}/>}
            </div>
            <div className={s.profileDetail}>
              <div className={s.name}>{professional.name} {professional.last_Name}</div>
              <div className={s.location}>{professional.city}, {professional.country}</div>
              <div className={s.description}>{professional.description}</div>

            </div>
          </div>

          <div className={s.orderBox}>
            <p className={s.orderText}>Mejores Reseñas</p>

            <div className={s.lastOrders}>
              <CardReview />
              <CardReview />
            </div>
          </div>
          <div className={s.configBox}>
          </div>
        </div>


        {/*----- CONTENEDOR DERECHO -----*/}
        <div className={s.rightContainer}>
          <div className={s.professionContainer}>
            <p className={s.professionText}>Oficios publicados</p>
            <ProfessionBox professional={professional}/>
          </div>
          <div className={s.moreReviews}>
            <span className={s.premiumText}>
              <h1>Otras reseñas</h1>
            </span>
            <ReviewBox/>
          </div>
        </div>


      </div>
    </>
  )
}

export default Profile;