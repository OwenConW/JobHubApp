import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';

import s from './Details.module.scss';
import { getLocalStorage } from "../../handlers/localStorage";

import Navbar from "../Navbar/Navbar";
import CardReview from './CardReview/CardReview.jsx'
import ProfessionBox from "../ProfessionBox/ProfessionBox";
import ReviewBox from "./ReviewBox/ReviewBox.jsx"
import { useParams, useNavigate } from "react-router-dom";
import { getChars, getCharsById, clearUserDetail } from '../../redux/userActions';
import defaultimage from '../Navbar/assets/deafultimage.png';
import axios from "axios";
import corona from "./assets/corona.png"
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {

  let params = useParams();
  let activeUser = getLocalStorage();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const professional = useSelector((state) => state.users.detail);
  const allUsers = useSelector((state) => state.users.users)
  const id = params.id;
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    dispatch(getCharsById(id))
    dispatch(getChars())

    return () => {
      dispatch(clearUserDetail());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const onCoordinate = async() => {

    let data = {
      emisor_id: activeUser.id,
      receptor_id: id * 1
    }
    if (data.emisor_id === data.receptor_id) {
      Swal.fire("No puedes chatear ni crear ordenes contigo mismo");
    } else {
      try {

        await axios.post('/conversation', data);
        navigate('/chat');
      } catch (e) {
        console.log(e);
      }
    }
  }

  const onReport = () => {
    navigate('/support', { state: { id: id } });
  }

  return (
    <>
      <Navbar />
      {/*----- CONTENEDOR IZQUIERDO -----*/}
      <div className={s.container}>
        <div className={s.leftContainer}>
          <div className={s.profileInfo}>
            {isAuthenticated ?
              professional.isPremium ? (
                <div className={s.profile_Img_containerPremium}>
                  {professional.image ? <img src={professional.image === 'noimage' ? defaultimage : professional.image} className={s.profile_ImgPremium} alt="" /> : <img src={defaultimage} className={s.profile_Img} alt="" />}
                  <div onClick={() => onCoordinate()} className={s.btnCoordinate}>Contactar</div>
                  <div onClick={() => onReport()} className={s.btnReport}>Reportar</div>
                </div>
              ) : (
                <div className={s.profile_Img_container}>
                  {professional.image ? <img src={professional.image === 'noimage' ? defaultimage : professional.image} className={s.profile_Img} alt="" /> : <img src={defaultimage} className={s.profile_Img} alt="" />}
                  <div onClick={() => onCoordinate()} className={s.btnCoordinate}>Contactar</div>
                  <div onClick={() => onReport()} className={s.btnReport}>Reportar</div>
                </div>
              ) : professional.isPremium ? (
                <div className={s.profile_Img_containerPremium}>
                  {professional.image ? <img src={professional.image === 'noimage' ? defaultimage : professional.image} className={s.profile_ImgPremium} alt="" /> : <img src={defaultimage} className={s.profile_Img} alt="" />}
                </div>
              ) : (
                <div className={s.profile_Img_container}>
                  {professional.image ? <img src={professional.image === 'noimage' ? defaultimage : professional.image} className={s.profile_Img} alt="" /> : <img src={defaultimage} className={s.profile_Img} alt="" />}
                </div>
              )
            }

            <div className={s.profileDetail}>
              {
                professional.isPremium ? (
                  <div className={s.namePremium}><img src={corona} alt="" className={s.corona} />{professional.name} {professional.last_Name}</div>
                ) : (
                  <div className={s.name}>{professional.name} {professional.last_Name}</div>
                )
              }

              <div className={s.location}>{professional.city}, {professional.country}</div>
              <div className={s.description}>{professional.description}</div>

            </div>
          </div>

          <div className={s.orderBox}>
            <p className={s.orderText}>Mejores Reseñas</p>

            <div className={s.lastOrders}>
              {
                professional?.reviews?.slice().sort((x, y) => {  
                  if(x.rating > y.rating){
                      return -1 

                  }
                  if (x.rating < y.rating) {
                    return 1;
                  }
                  return 0
                }).slice(0, 4).map(review => {
                  let reviewer = allUsers.find(user => user.id === review.id_user_client)
                  return (
                    <CardReview dataObj={review} reviewer={reviewer} key={review.id_orders} />
                  )
                })
              }

            </div>
          </div>
          <div className={s.configBox}>
          </div>
        </div>


        {/*----- CONTENEDOR DERECHO -----*/}
        <div className={s.rightContainer}>
          <div className={professional?.isPremium ? s.professionContainerPremium : s.professionContainer}>
            <p className={s.professionText}>Oficios publicados</p>
            <ProfessionBox professional={professional} />
          </div>
          {

          }
          <div className={professional?.isPremium ? s.moreImages : s.moreReviews}> {/* : s.poorMoreReviews */}
            <span className={s.premiumText}>
              {
                professional?.isPremium ? <h1>Trabajos destacados del Profesional</h1> : <h1>Todas las reseñas</h1>
              }

            </span>
            <ReviewBox professional={professional} allUsers={allUsers} />
          </div>
        </div>

      </div>
    </>
  )
}

export default Profile;
