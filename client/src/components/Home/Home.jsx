import React from 'react';
import axios from 'axios';

//components
import Navbar from "../Navbar/Navbar";

//styles and utilities
import s from './Home.module.scss';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';


const Home = () => {

  const { isAuthenticated } = useAuth0();

  return (
    <React.Fragment>
      <Navbar />
      <div className={s.container1}>
        <div className={s.presentation}>
          <h1 className={s.title}>El buen servicio de un profesional está a tu alcance!</h1>
          <h3 className={s.text}>Tenemos las mejores herramientas para que encuentres a las personas adecuadas en tu cuidad actual, rápido, seguro y fácil.</h3>
          <h3 className={s.text}>Encuentra a l@s mejores trabajador@s buscándolos por catálogo,</h3>
          <h3 className={s.text}>cerca de tu área, contactá, llegá a un acuerdo y listo.</h3>
        </div>
        <div className={s.destacados}>
          <h1 className={s.subtitle}>Trabajadores destacados de la semana</h1>
          {/* {Aqui van las 3 cards de los destacados!!!!} */}
          <Link to='/professionals' className={s.link}>
            <button className={s.button}>Explorar Catálogo</button>
          </Link>
        </div>
      </div>
      <div className={s.container2}>
        <h1 className={s.titlemapa}>Utiliza nuestro sistema de búsqueda por ubicación</h1>
        {isAuthenticated ?
          <Link to='/map' className={s.link}>
            <button className={s.button}>Buscar</button>
          </Link>
        : <Link to='/login' className={s.link}>
            <button className={s.button}>Iniciar Sesión</button>
          </Link>
        }
      </div>
    </React.Fragment>
  )
}

export default Home;