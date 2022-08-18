import React from 'react';

//styles and utilities
import s from './Card.module.scss';
// import { Link } from 'react-router-dom';
import star from './assets/Star.svg';
import details_interior from './assets/Det_interior.svg';

// const Card = ({ id, name, lastName, city, province, rating, name_job, image }) => {
const Card = ({
  id = '23',
  name = "Martin",
  lastName = "Morales",
  city = "CABA",
  province = "Buenos Aires",
  rating = 5.0,
  name_job = 'Electricista',
  image = "https://api.time.com/wp-content/uploads/2017/12/terry-crews-person-of-year-2017-time-magazine-2.jpg"
}) => {

  return (

  <div className={s.card}>
    <div className={s.header}>
      <h3>{name_job}</h3>
      <div className={s.rating}>
        <img src={star} alt="star" />
        <p>{rating}</p>
      </div>
    </div>

    <div className={s.data}>
      <div className={s.info}>
        <div className={s.user}>
          <div className={s.image}>
            <img src={image} alt="user_profile" />
          </div>
          <div className={s.userinfo}>
            <h3>{name} {lastName}</h3>
            <p>{city}, {province}</p>
          </div>
        </div>
        <div className={s.detail}>
          <div className={s.btn}>
            <img src={details_interior} alt="details" />
          </div>
        </div>
      </div>
      <div className={s.top}>
      </div>
      <div className={s.bottom}>
      </div>
    </div>
  </div>

  )
}
export default Card;