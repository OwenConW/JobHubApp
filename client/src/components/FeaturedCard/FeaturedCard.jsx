import React from 'react';
import s from './FeaturedCard.module.scss';
import { motion } from 'framer-motion/dist/framer-motion.js';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCharsById } from '../../redux/userActions';

//assets
import star from './assets/star.png';
import background from './assets/backcard.svg';
import sign from './assets/sign.svg';
import default_user from './assets/default_user.png';

const FeaturedCard = (id) => {
   
  const dispatch = useDispatch();
  const professional = useSelector((state) => state.users.detail)
  
  useEffect(() => {
    dispatch(getCharsById(id))
  }, [])

  const name = <h4>{professional.name} {professional.last_Name}</h4>;
  const cuidad = <p>{professional.city}, {professional.country}</p>;
  const jobs = professional.professions; 
  const br = <br></br>;

  return (
    <div className={s.container}
      transition={{duration: 1}}
      initial={{
        opacity:0,
        scale: 0,
      }}
      animate={{
        opacity:1,
        scale:1,
      }}
    >
      <motion.div className={s.oficio}
        transition={{duration: 0.3, delay:1}}
        initial={{
          opacity:0,
          y:100,
        }}
        animate={{
          opacity: 1,
          y:0,
        }}
      >{jobs ? jobs.map((job) => (<h4>{job} {br}</h4>)) : <h4>Jobs not Find</h4>}
      </motion.div>
      <motion.img src={background} alt="back" className={s.background} 
        transition={{duration: 0.3, delay:1}}
        initial={{
          opacity:0,
        }}
        animate={{
          opacity: 1,
        }}
      />
      <div className={s.image}>
        {professional.image ? <img src={professional.image}/> : <img src={default_user} alt="img user not found"/>}
      </div>
      <div className={s.data}>
        <motion.div className={s.name}
          transition={{duration: 0.3, delay:1}}
          initial={{
            opacity:0,
            x:100,
          }}
          animate={{
            opacity: 1,
            x:0,
          }}
        >{name} {cuidad}
        </motion.div>
        <motion.div className={s.info}
          transition={{duration: 0.3, delay:1}}
          initial={{
            opacity:0,
            x:-100,
          }}
          animate={{
            opacity: 1,
            x:0,
          }}
        >
          <div className={s.resenas}>
            <h4>Reseñas</h4>
            {/* ACA FALTA SABER COMO RECIBIRÁ EL NRO DE RESEÑAS TOTALES */}
            <p>{professional.resenas}</p>
          </div>
          <div className={s.calificacion}>
            <h4>Calificación</h4>
            <div className={s.rating}>
              <img src={star} alt="image" />
              <p>{professional.rating}</p>
            </div>
          </div>
        </motion.div>
        <motion.button
          transition={{duration: 0.5, delay:1}}
          initial={{
            opacity:0,
            scale: 0,
          }}
          animate={{
            opacity:1,
            scale:1,
          }}
        > <img src={sign} alt="sign"/>
        </motion.button>
      </div>
    </div>
  )
}

export default FeaturedCard;