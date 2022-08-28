import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import s from './OrdersProfessional.module.scss';

const OrdersProfessional = ({order, setProf, profOrders}) => {
    const [client, setClient] = useState([]);

    useEffect(() => {
        const fetchUser = async() => {
            let response = await axios.get(`/users/${order.id_user_client}`);

            setClient(response.data);

        }

        fetchUser();
    }, [])

    const handleClick = async() => {

        let body = {
            complete: false,
            allowReview: true,
        }

        await axios.put(`/orders/${order.id}`, body);
        setProf(profOrders.filter(p => p.id !== order.id));
    }

    return(
        <div className={s.order} key={client.id}>
            <div className={s.img}>
                <img src={client.image} alt="" />
            </div>
            <div className={s.userdata}>
                <p className={s.name}>{client.name} {client.last_Name}</p>
                <p className={s.location}>{client.city}, {client.country}</p>
            </div>
            <div className={s.btndiv}>
                <div className={s.btn} onClick={() => {handleClick()}}>Completar</div>
            </div>
        </div>
    )

}

export default OrdersProfessional;


