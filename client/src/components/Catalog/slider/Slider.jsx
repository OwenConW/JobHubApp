import React from 'react';
import Slider from 'react-slick';
import s from './slider.module.scss';

import fst_header from './assets/div1.jpg';
import scd_header from './assets/div2.jpg';
import tr_header from './assets/div3.jpg';

const SliderComponent = () => {

    let settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    }

      return (
        <div className={s.container}>
          <Slider {...settings}>
              <div><img src={fst_header} alt="" /></div>
              <div><img src={scd_header} alt="" /></div>
              <div><img src={tr_header} alt="" /></div>
          </Slider>
         </div>
      );
    }

export default SliderComponent;