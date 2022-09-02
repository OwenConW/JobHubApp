import React from 'react';
import Slider from 'react-slick';
import s from './slider.module.scss';
import div1 from './assets/div1.jpg';
import div2 from './assets/div2.jpg';
import div3 from './assets/div3.jpg';

const SliderComponent = () => {

    let settings = {
        className: s.sample,
        autoplay: true,
        autoplaySpeed: 5000,
    }

      return (
        <Slider {...settings}>
            <div className={s.div1}><img src={div1} alt="" /></div>
            <div className={s.div2}><img src={div2} alt="" /></div>
            <div className={s.div3}><img src={div3} alt="" /></div>
         </Slider>
      );
    }

export default SliderComponent;