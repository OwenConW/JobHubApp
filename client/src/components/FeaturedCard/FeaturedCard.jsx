import React from 'react';
import s from './FeaturedCard.module.scss';
import { motion } from 'framer-motion/dist/framer-motion.js';


//assets
import star from './assets/star.png';
import background from './assets/backcard.svg';
import sign from './assets/sign.svg';
import default_user from './assets/default_user.png';

const FeaturedCard = (prop) => { 

  return (
    <motion.div className={prop?.prop.isPremium ? s.containerPremium : s.container}
      transition={{duration: 0.5}}
      initial={{
        opacity:0,
      }}
      animate={{
        opacity:1,
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
      >{prop?.prop.name ? <h3 style={{textTransform: "capitalize"}}>{prop?.prop.name}</h3> : <h4>Jobs not Find</h4>}
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
      {
        prop?.prop.isPremium ? (
          <div className={s.imagePremium}>
            {prop?.prop.image ? <img src={prop?.prop.image} alt=""/> : <img src={default_user} alt="img user not found"/>}
          </div>
        ) : (
          <div className={s.image}>
            {prop?.prop.image ? <img src={prop?.prop.image} alt=""/> : <img src={default_user} alt="img user not found"/>}
          </div>
        )
      }
     
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
        ><h4>{prop?.prop.city}, {prop?.prop.country}</h4>
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
          <div className={s.calificacion}>
            <h4>Calificación</h4>
            <div className={s.rating}>
              <img src={star} alt="" />
              <b className={s.ratingNumber}>{prop?.prop.rating === -1 ? <h4>Sin reseñas</h4> : prop?.prop.rating}</b>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default FeaturedCard;