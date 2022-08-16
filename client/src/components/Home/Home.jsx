import React from 'react';

//components
import Navbar from "../Navbar/Navbar";

//assets


//styles and utilities
import s from './Home.module.scss';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className={s.container}>
        <div className={s.navbar}>
          <Navbar />
        </div>
        <div className={s.presentation}>
            <h1 className={s.title}>Titulo canchero llamativo</h1>
            <h3 className={s.text}>Aqui en nuestra plataforma, podrás encontrar los mejores profesionales para satisfacer tus necesidades</h3>
            <h3 className={s.text}>Encuentra a l@s mejores trabajador@s buscándolos por catálogo, cerca de tu área, contactá, llegá a un acuerdo y listo</h3>
            <h3 className={s.text}>Tenemos las mejores herramientas para que encuentres a las personas adecuadas, rápido, sencillo y cerca de tu cuidad.</h3>
        </div>
        <div className={s.destacados}>
            <h1 className={s.title}>Trabajadores destacados de la semana</h1>
            
            {/* {Aqui van las 3 cards de los destacados!!!!} */}
            
            <Link to='/professionals' className={s.link}>
                <button className={s.button}>Explorar Catálogo</button>
            </Link>
        </div>
    </div>
  )
}

export default Home;