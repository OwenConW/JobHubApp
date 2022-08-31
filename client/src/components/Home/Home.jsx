import React, { useEffect } from 'react';
// import axios from 'axios';
import { Link, /*useLocation*/ } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';

//components
import Navbar from "../Navbar/Navbar";
import FeaturedCard from "../FeaturedCard/FeaturedCard";


//styles and utilities
import { getLeadingProfessionals } from '../../redux/userActions';
import s from './Home.module.scss';



const Home = () => {

  const dispatch = useDispatch()
  useEffect(() => { 
    dispatch(getLeadingProfessionals()) 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) 
  
  // const search = useLocation().search;
  // const prueba = new URLSearchParams(search).get('prueba');


  const { isAuthenticated } = useAuth0();
  const br = <br></br>;
  
  // GET A LOS MEJORES TRABAJADORES DESTACADOS DE LA SEMANA::::::
  const bestProffesionals = useSelector((state) => state.users.filteredProfessionals)
    
  return (
    <>
      <Navbar />
      <div className={s.container}>
      <div className={s.maptop}>
          <h1 className={s.titlemapa}>Utiliza nuestro sistema de búsqueda por ubicación</h1>
          {isAuthenticated ?
            <Link to='/map' className={s.link}>
              <div className={s.button}>
					      <p>Buscar</p>
				      </div>
            </Link>
          : <Link to='/' className={s.link}> 
              <div className={s.button}>
					      <p>Iniciar Sesión</p>
				      </div>
            </Link>
          }
        </div>
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
              {/* {console.log("mejores",bestProffesionals)} */}
              {bestProffesionals.length ? bestProffesionals.slice(0,3).map((obj, i) => {
                  return <FeaturedCard key={i} prop={obj}/>
                })
              : (
							  <div className={s.notFind}>
								  -- Estamos actualizando los profesionales de la semana --
							  </div>
						  )} 
            </div>
            <Link to='/professionals' className={s.link}>
            <div className={s.button}>
					      <p>Explorar Catalogo</p>
				      </div>
            </Link>
          </div>
        </aside>
        <div className={s.container2}>
          <h1 className={s.titlemapa}>Utiliza nuestro sistema de búsqueda por ubicación</h1>
          {isAuthenticated ?
            <Link to='/map' className={s.link}>
              <div className={s.button}>
					      <p>Buscar</p>
				      </div>
            </Link>
          : <Link to='/' className={s.link}> 
              <div className={s.button}>
					      <p>Iniciar Sesión</p>
				      </div>
            </Link>
          }
        </div>
      </div>
    </>    
  )
}

export default Home;