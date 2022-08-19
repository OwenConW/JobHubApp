import React from 'react';
import axios from 'axios';

//components
import Navbar from "../Navbar/Navbar";
import FeaturedCard from "../FeaturedCard/FeaturedCard";


//styles and utilities
import s from './Home.module.scss';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {

  const { isAuthenticated } = useAuth0();
  const br = <br></br>;
  
  // GET A LOS MEJORES TRABAJADORES DESTACADOS DE LA SEMANA::::::
  // const dispatch = useDispatch()
  // const bestProffesionals = useSelector((state) => state.getDestacados)

  // useEffect(() => { dispatch(getDestacados()) }, [dispatch])  

  return (
    <>
      <Navbar />
      <div className={s.container}>
        <aside className={s.aside}>
          <div className={s.presentation}>
            <h1 className={s.title}>El buen servicio de un profesional está a tu alcance!</h1>
            <h3 className={s.text}>Tenemos las mejores herramientas para que encuentres a las personas adecuadas en tu cuidad, sea donde estés, ¿necesitas un servicio? encuéntralo rápido, seguro y fácil.</h3>
            <h3 className={s.text}>L@s mejores trabajador@s te están esperando! búscalos cerca de tu área o por catálogo, contactá, acordá a un acuerdo, fecha, pago y listo.</h3>
         </div>
          <div className={s.destacados}>
            <h1 className={s.subtitle}>Trabajadores destacados de la semana</h1>
            {/* {Aqui van las 3 cards de los destacados!!!!} */}
            <div className={s.cards}> 
              <FeaturedCard className={s.card} /> 
              <FeaturedCard className={s.card} />
              <FeaturedCard className={s.card} />
            </div>
            <Link to='/professionals' className={s.link}>
              <button className={s.button}>Explorar Catálogo</button>
            </Link>
          </div>
        </aside>
        <div className={s.container2}>
          <h1 className={s.titlemapa}>Utiliza nuestro {br} sistema de {br} búsqueda por {br} ubicación</h1>
          {isAuthenticated ?
            <Link to='/map' className={s.link}>
              <button className={s.button}>Buscar</button> 
            </Link>
          : <Link to='/' className={s.link}>
              <button className={s.button}>Iniciar Sesión</button> 
            </Link>
          }
        </div>
      </div>
    </>    
  )
}

export default Home;