import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import s from './OrdersProfessional.module.scss';
import Swal from 'sweetalert2';

const OrdersProfessional = ({order, setProf, profOrders}) => {
    const [client, setClient] = useState([]);

    useEffect(() => {
        const fetchUser = async() => {
            let response = await axios.get(`/users/${order.id_user_client}`);

            setClient(response.data);

        }

        fetchUser();
    }, [])

    const handleClick = () => {
        Swal.fire({
            title: 'Seguro?',
            text: "Al completar, habilitas al cliente a puntuarte.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#2C666E',
            cancelButtonColor: '#4e4e4e',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Completar'
          }).then((result) => {
            let body = {
                complete: false,
                allowReview: true,
            }
            if (result.isConfirmed) {
                axios.put(`/orders/${order.id}`, body).then(() => setProf(profOrders.filter(p => p.id !== order.id)))
                .then(() => Swal.fire({
                    title: 'Genial!',
                    text: "Ahora el cliente podrá puntuarte",
                    icon: 'success',
                    confirmButtonColor: '#2C666E',
                }))
             }
          })
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
                <div className={s.btn} onClick={() => handleClick()}>Completar</div>
            </div>
        </div>
    )

}

export default OrdersProfessional;


