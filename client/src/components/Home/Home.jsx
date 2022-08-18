import React from 'react';

//components
import Navbar from "../Navbar/Navbar";
import FeaturedCard from "../FeaturedCard/FeaturedCard";

//styles and utilities
import s from './Home.module.scss';
import { Link } from 'react-router-dom';

const isAutenticated = false;
const br = <br></br>;

const Home = () => {
  
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
            <h3 className={s.text}>Tenemos las mejores herramientas para que encuentres a las personas adecuadas en tu cuidad actual, rápido, seguro y fácil.</h3>
            <h3 className={s.text}>Encuentra a l@s mejores trabajador@s buscándolos por catálogo,</h3>
            <h3 className={s.text}>cerca de tu área, contactá, llegá a un acuerdo y listo.</h3>
          </div>
          <div className={s.destacados}>
            <h1 className={s.subtitle}>Trabajadores destacados de la semana</h1>
            {/* {Aqui van las 3 cards de los destacados!!!!} */}
            <div className={s.cards}> 
              <FeaturedCard className={s.card} /> 
            </div>
            <Link to='/professionals' className={s.link}>
              <button className={s.button}>Explorar Catálogo</button>
            </Link>
          </div>
        </aside>
        <div className={s.container2}>
          <h1 className={s.titlemapa}>Utiliza nuestro {br} sistema de {br} búsqueda por {br} ubicación</h1>
          {isAutenticated ?
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