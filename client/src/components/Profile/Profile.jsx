import React from "react";
import s from './Profile.module.scss';
import userImg from './assets/userimage.jpg'
import configLogo from './assets/configLogo.svg'
import Navbar from "../Navbar/Navbar";
import CardProfileMap from '../CardProfileMap/CardProfileMap.jsx'
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

let orders = [{ name: 'Nombre 1', profession: 'Diseñador', rating: 4.2 }, { name: 'Nombre 2', profession: 'Plomero', rating: 3 }, { name: 'Nombre 3', profession: 'Electricista', rating: 5 }]
let jobs = [{ name: 'Electricista', description: 'descripcion de la tarea', rating: 4.2, reviews: 25 }, { name: 'Gasista', description: 'descripcion de la tarea', rating: 3.4, reviews: 10 }]


const Profile = () => {

  const {logout} = useAuth0();

  const activeUser = useSelector(state => state.users.activeUser);
  console.log(activeUser);

  return (
    <>
    <Navbar />

    <div className={s.container}>
      <div className={s.leftContainer}>
        <div className={s.profileInfo}>
          <div className={s.profile_Img_container}>
            <img src={userImg} className={s.profile_Img} />
          </div>
          <div className={s.profileDetail}>
            <div className={s.name}>{activeUser.user.name} {activeUser.user.last_Name}</div>
            <div className={s.location}>{activeUser.user.city}, {activeUser.user.country}</div>
            <div className={s.description}>Descripcion que quiera poner la persona a su perfil, quizas habria que agregarlo en la parte de db como parte del usuario </div>
          </div>
        </div>

        <div className={s.orderBox}>
          <p className={s.orderText}>Mis ordenes recientes</p>

          <div className={s.lastOrders}>
            <CardProfileMap/>
            <CardProfileMap/>
            <CardProfileMap/>

            {/* {
              orders.map(order => {
                return (
                  <div className={s.orders}>
                    <div className={s.imgDetail}><img alt="imagen"></img></div>

                    <div className={s.orderDetail}>
                      <h1>{order.name}</h1>
                      <h2>{order.profession}</h2>
                    </div>
                    <div className={s.orderDetail2}>
                      <h3><img src={star} /> {order.rating}</h3>
                    </div>
                  </div>
                )
              })
            } */}
          </div>
        </div>
        <div className={s.configBox}>
          <img src={configLogo}></img>
          <button onClick={() => logout()}>Log out</button>
        </div>
      </div>


      <div className={s.rightContainer}>

        <div className={s.professionContainer}>
          <p className={s.professionText}>Mis oficios publicados</p>
          <div className={s.professionList}>
            {
              jobs.map(job => {
                return (
                  <div className={s.professionComponent}>
                    <div className={s.professionAndDescription}>
                      <h1>{job.name}</h1>
                      <h2>{job.description}</h2>
                    </div>
                    <div className={s.professionStats}>
                      <h3>Reseñas</h3>
                      <h4>{job.reviews}</h4>
                    </div>
                    <div className={s.professionStats}>
                      <h3>Calificación</h3>
                      <h4>{job.rating}</h4>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Profile;