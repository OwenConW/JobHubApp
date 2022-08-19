import React from 'react';
import s from './FeaturedCard.module.scss';
import {motion} from 'framer-motion/dist/framer-motion.js';

//assets
//FOTO del Proffesional
import star from './assets/star.png';
import background from './assets/backcard.svg';
import sign from './assets/sign.svg';

import user from './assets/user.jpg';

const FeaturedCard = () => {

  const name = <h4>Jeremias Escobedo</h4>;
  const cuidad = <p>Pilar, Buenos Aires</p>;

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
      >Electricista</motion.div>
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
        <img src={user} alt="image_profile"/>
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
        >{name} {cuidad}</motion.div>
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
            <p>90</p>
          </div>
          <div className={s.calificacion}>
            <h4>Calificación</h4>
            <div className={s.rating}>
              <img src={star} alt="image" />
              <p>5.0</p>
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