import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import s from './OrdersProfessional.module.scss';
import swal from 'sweetalert';

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
        swal({
            title: "Trabajo",
            text: "Estás seguro que se completo el trabajo? Si completas el cliente podrá puntuarte.",
            icon: "info",
            buttons: true,
          })
          .then((willComplete) => {
            let body = {
                complete: false,
                allowReview: true,
            }
            if (willComplete) {
            axios.put(`/orders/${order.id}`, body).then(() => setProf(profOrders.filter(p => p.id !== order.id)))
            .then(() => swal("Se ha habilitado la puntuacion al cliente.", {
                icon: "success",
              }))
            }
          });
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


