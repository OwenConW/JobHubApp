import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import s from './Details.module.scss';
import { getLocalStorage } from "../../handlers/localStorage";

import Navbar from "../Navbar/Navbar";
import CardReview from './CardReview/CardReview.jsx'
import ProfessionBox from "../ProfessionBox/ProfessionBox";
import ReviewBox from "./ReviewBox/ReviewBox.jsx"
import { useParams, useNavigate } from "react-router-dom";
import { getChars, getCharsById } from '../../redux/userActions';
import defaultimage from './assets/deafultimage.png';
import axios from "axios";
import corona from "./assets/corona.png"


const Profile = () => {

  let params = useParams();
  let activeUser = getLocalStorage();

  const dispatch = useDispatch();
  const navigate  = useNavigate();
  const professional = useSelector((state) => state.users.detail);
  const allUsers = useSelector((state) => state.users.users)
  const id = params.id;

  useEffect(() => {
    dispatch(getCharsById(id))
<<<<<<< HEAD
  }, [dispatch, id])
=======
    dispatch(getChars())
  }, [])
>>>>>>> 86f7172ceaa43944b7f56638ff8e0d7a86f07ae2

  const onCoordinate = async() => {
    let data = {
      emisor_id: activeUser.id,
      receptor_id: id * 1
    }
    console.log(data)
    if(data.emisor_id === data.receptor_id ){
      alert("No puedes ordenar contigo mismo )?")
    }else{
      try{

        // await axios.post('/conversation', data);
        // navigate('/chat');
      }catch(e){
        console.log(e);
      }
    }
  }


  return (
    <>
      <Navbar />
      {/*----- CONTENEDOR IZQUIERDO -----*/}
      <div className={s.container}>
        <div className={s.leftContainer}>
          <div className={s.profileInfo}>
<<<<<<< HEAD
            <div className={s.profile_Img_container}>
              {professional.image ? <img src={professional.image} className={s.profile_Img} alt="professional-img"/> : <img src={defaultimage} className={s.profile_Img} alt="professional-default-img"/>}
            </div>
=======
            {
              professional.isPremium ? (
                <div className={s.profile_Img_containerPremium}>
                  {professional.image ? <img src={professional.image} className={s.profile_ImgPremium}/> : <img src={defaultimage} className={s.profile_Img}/>}
                </div>
              ) : (
                <div className={s.profile_Img_container}>
                  {professional.image ? <img src={professional.image} className={s.profile_Img}/> : <img src={defaultimage} className={s.profile_Img}/>}
                </div>
              )
            }
          
>>>>>>> 86f7172ceaa43944b7f56638ff8e0d7a86f07ae2
            <div className={s.profileDetail}>
              {
                professional.isPremium ? (
                  <div className={s.namePremium}><img src={corona} alt="" className={s.corona}/>{professional.name} {professional.last_Name}</div>
                ) : (
                  <div className={s.name}>{professional.name} {professional.last_Name}</div>
                )
              }
              
              <div className={s.location}>{professional.city}, {professional.country}</div>
              <div className={s.description}>{professional.description}</div>
              <div onClick={() => onCoordinate()} className={s.btnCoordinate}>Coordinar</div>
            </div>
          </div>

          <div className={s.orderBox}>
            <p className={s.orderText}>Mejores Reseñas</p>

            <div className={s.lastOrders}>
              {
                professional.reviews && professional.reviews.map(review => {
                  let reviewer = allUsers.find(user => user.id === review.id_user_client)
                  return (
                  <CardReview dataObj={review} reviewer={reviewer} key={review.id_orders}/>
                )})
              }
             
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