import React from 'react';

//styles and utilities
import s from './Card.module.scss';
import { Link } from 'react-router-dom';
import star from './assets/Star.svg';
import details_button from './assets/Details.svg';
import details_interior from './assets/Det_interior.svg';

// const Card = ({ id, name, lastName, city, province, rating, name_job, image }) => {
const Card = ({
  id = '23',
  name = "martin",
  lastName = "morales",
  city = "CABA",
  province = "Buenos Aires",
  rating = 5,
  name_job = 'Electricista',
  image = "https://c8.alamy.com/compes/j2tx01/un-electricista-manitas-cartoon-character-sosteniendo-un-destornillador-y-dando-un-thumbs-up-j2tx01.jpg"
}) => {

  return (
    <div className={s.card}>
      <div className={s.header}>
        <h2>{name_job}</h2>
        <div>
          <img src={star} alt='star'></img>
        </div>

        <h2>{rating}</h2>
      </div>
      <div>
        <div>
          <img src={image} className={s.img}></img>
          <h3 className={s.name}>{name} {lastName}</h3>
          <h4 className={s.place}>{city}, {province}</h4>
        </div>
        <div>
          <Link to={`/users/${id}`} className={s.detail_button}>
            <div>
              <img src={details_button} alt='button'>
                
              </img>
            </div>
          </Link>
        </div>
      </div>
    </div>

  )
}
export default Card