import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import s from './OrdersProfessional.module.scss';

const OrdersProfessional = ({orders, allUsers}) => {
    const [clients, setClients] = useState([]);

    useEffect(() => {

        let clts = allUsers.filter(user => {
            return orders.find(order => user.id === order.id_user_client);
        })

        setClients(clts);
    }, [allUsers, orders])

    const handleClick = async (id) => {
        let body = {
            complete: false,
            allowReview: true
        }
        await axios.put(`/orders/${id}`, body);
        window.location.reload(false);
    };

    return (
        <div className={s.container}>
            <h4>Ordenes para completar</h4>
            {clients?.length ?
            clients?.map(client => {
                return (
                <div className={s.order} key={client.id}>
                    <div className={s.img}>
                        <img src={client.image} alt="" />
                    </div>
                    <div className={s.userdata}>
                        <p className={s.name}>{client.name} {client.last_Name}</p>
                        <p className={s.location}>{client.city}, {client.country}</p>
                    </div>
                    <div className={s.btndiv} onClick={() => handleClick(client.id)}>
                        <div className={s.btn}>Completar</div>
                    </div>
                </div>)
            }) : <p>No tienes ordenes pendientes</p>}
        </div>
    )
}

export default OrdersProfessional;