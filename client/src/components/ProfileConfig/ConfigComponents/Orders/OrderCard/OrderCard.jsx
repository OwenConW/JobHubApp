import React from "react"
import { useState } from "react"
import s from './OrderCard.module.scss'



const OrderCard = ({ order, users }) => {

  // eslint-disable-next-line no-self-assign
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
          <p className={s.location}>Numero de Orden: {order?.id}</p>
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
              <label>Fecha de Creacion: {order?.date_created.split('-').reverse().join('/')}</label>
            </div>
          </div>
        </form>
      </div>
    </div>
  )

}

export default OrderCard