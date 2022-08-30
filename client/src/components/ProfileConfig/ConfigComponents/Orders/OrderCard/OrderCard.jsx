// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";

// import s from './OrderCard.module.scss';
// import star from './assets/star.svg'
// import msg from './assets/sign.svg'


// //HARDCODEADO:
// import userImg from './assets/userimage.jpg'
// let order = { 
//   name: 'Nombre 1', 
//   profession: 'Diseñador', 
//   rating: 4.2, 
//   img: userImg, 
//   date_created: "26/08/2022", 
//   apointment_date: "29/08/2022", 
//   description: "acordamos que me haga el corte de pelo un dia por la tarde en mi domicilio y bueno era buena onda por que me ofrecio ciertas cosas para mi cabello por lo tanto también me voy a teñir"
// }
// if (order.description.length > 170) {
//   let description = order.description.substring(0, 170);
//   order.description = description + "...";
// } 

// const OrderCard = () => {

//   // const dispatch = useDispatch();
//   // const professional = useSelector((state) => state.users.detail)
//   // const { idProfessional } = prop.data.id;

//   // useEffect(() => {
//   //     dispatch(getCharsById(idProfessional))
//   // }, [])

//   // useEffect(() => {
//   //     dispatch(getOrder(id_))
//   // }, [])

//   return (

//     //HARDCODEADO
//     <div className={s.orders}>
//       <div className={s.imgDetail}>
//         <img src={order.img} alt="imagen"></img>
//       </div>
//       <div className={s.orderProfessional}>
//         <h1>{order.name}</h1>
//         <h2>{order.profession}</h2>
//         <div className={s.orderDate1}>
//           <h1>Creación de Orden= {order.date_created} &nbsp; Cita= {order.apointment_date}</h1>
//         </div>
//         <div className={s.orderDescription}>
//           <h2> {order.description} </h2>
//         </div>
//       </div>
//       <div className={s.orderRating}>
//           <h3><img src={star} /> {order.rating}</h3>
//       </div>
//       <div className={s.contact}>
//         {/* LINK AL DETALLE DEL PROFESIONAL O CHAT ??? */}
//         <button><img src={msg} alt="msg not found"/></button>
//       </div>

//     </div>
//   )
// }

// export default OrderCard


import React from "react"
import { useState } from "react"
import s from './OrderCard.module.scss'



const OrderCard = ({ order, users }) => {

  order = order


  let professional = users?.find(user => user.id === order?.id_user_professional)

  const [onorder, setOnorder] = useState(false);

  const handleorder = () => {
    onorder ? setOnorder(false) : setOnorder(true);
  }


  return (

    <div className={onorder ? s.review : s.order} key={professional?.id}>
      <div className={s.info}>
        <div className={s.img}>
          <img src={professional?.image} alt="" />
        </div>
        <div className={s.userdata}>
          <p className={s.name}>{professional?.name} {professional?.last_Name}</p>
          <p className={s.location}>{professional?.city}, {professional?.country}</p>
        </div>
        <div className={s.btndiv}>
          <div className={s.btn} onClick={handleorder}>Detalles</div>
        </div>
      </div>
      <div className={s.opinion}>
        <form className={s.form}>
          <div className={s.inputs}>
            <div className={s.description}>
              <label>Descripcion</label>
              <h3>{order?.description ? order.description : 'La orden no tiene descripcion'}</h3>
            </div>
            <div className={s.barra}>
              <label>Codigo de Orden: {order?.id}</label>
            </div>
          </div>
        </form>
      </div>
    </div>
  )

}

export default OrderCard