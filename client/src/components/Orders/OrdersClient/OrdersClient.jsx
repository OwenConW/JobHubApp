import React, { useEffect } from 'react';
import { useState } from 'react';
import s from './OrdersClient.module.scss';

const OrdersClient = ({orders, allUsers}) => {
    const [professionals, setProfessionals] = useState([]);

    useEffect(() => {

        let profs = allUsers.filter(user => {
            return orders.find(order => user.id === order.id_user_professional);
        })

        setProfessionals(profs);
    }, [allUsers, orders])

    return (
        <div className={s.container}>
            <h4>Puntajes pendientes</h4>
            {professionals?.length ?
            professionals?.map(professional => {
                return (
                <div className={s.order} key={professional.id}>
                    <div className={s.img}>
                        <img src={professional.image} alt="" />
                    </div>
                    <div className={s.userdata}>
                        <p className={s.name}>{professional.name} {professional.last_Name}</p>
                        <p className={s.location}>{professional.city}, {professional.country}</p>
                    </div>
                    <div className={s.btndiv}>
                        <div className={s.btn}>Puntuar</div>
                    </div>
                </div>)
            }) : <p>No tienes puntuaciones pendientes</p>}
        </div>
    )
}

export default OrdersClient