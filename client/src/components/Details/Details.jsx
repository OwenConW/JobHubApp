import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import s from './Details.module.scss';
<<<<<<< HEAD
=======
import { getLocalStorage } from "../../handlers/localStorage";
>>>>>>> d22c7c7cad6bb34e2504d124328a2db48aa7f28d

import Navbar from "../Navbar/Navbar";
import CardReview from './CardReview/CardReview.jsx'
import ProfessionBox from "../ProfessionBox/ProfessionBox";
import ReviewBox from "./ReviewBox/ReviewBox.jsx"
import { getCharsById } from '../../redux/userActions';
import { useParams, useNavigate } from "react-router-dom";
import defaultimage from './assets/deafultimage.png';
import axios from "axios";



const Profile = () => {

  let params = useParams();
  let activeUser = getLocalStorage();

  const dispatch = useDispatch();
  const navigate  = useNavigate();
  const professional = useSelector((state) => state.users.detail);
  const id = params.id;

  useEffect(() => {
    dispatch(getCharsById(id))
  }, [dispatch, id])

  const onCoordinate = async() => {
    let data = {
      emisor_id: activeUser.id,
      receptor_id: id * 1
    }
    console.log(data)
    if(data.emisor_id === data.receptor_id ){
      alert("No puedes chatear contigo mismo )?")
    }else{
      try{
        await axios.post('/conversation', data);
        navigate('/chat');
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
            <div className={s.profile_Img_container}>
              {professional.image ? <img src={professional.image} className={s.profile_Img} alt="professional-img"/> : <img src={defaultimage} className={s.profile_Img} alt="professional-default-img"/>}
            </div>
            <div className={s.profileDetail}>
              <div className={s.name}>{professional.name} {professional.last_Name}</div>
              <div className={s.location}>{professional.city}, {professional.country}</div>
              <div className={s.description}>{professional.description}</div>
              <div onClick={() => onCoordinate()} className={s.btnCoordinate}>Coordinar</div>
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