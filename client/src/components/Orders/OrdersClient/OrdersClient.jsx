import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import s from './OrdersClient.module.scss';

const OrdersClient = ({order}) => {
    const [professional, setProfessional] = useState([]);
    const [onReview, setOnReview] = useState(false);

    useEffect(() => {
        const fetchProf = async() => {
            let response = await axios.get(`/users/${order.id_user_professional}`);
            setProfessional(response.data);
        }

        fetchProf();
    }, [])

    const handleReview = () =>{
        onReview ? setOnReview(false) : setOnReview(true);
    }

    return(
        <div className={onReview ? s.review : s.order} key={professional.id}>
        <div className={s.info}>
            <div className={s.img}>
                <img src={professional.image} alt="" />
            </div>
            <div className={s.userdata}>
                <p className={s.name}>{professional.name} {professional.last_Name}</p>
                <p className={s.location}>{professional.city}, {professional.country}</p>
            </div>
            <div className={s.btndiv}>
                <div className={s.btn} onClick={handleReview}>Puntuar</div>
            </div>
        </div>
        <div className={s.opinion}>
          <form className={s.form}>
          <div className={s.description}>
                <label>Description</label>
                <textarea></textarea>
            </div>
            <div className={s.barra}>
                <label>Puntaje</label>
                <input
                    name="rating"
                    max="5"
                    step="0.5"
                    type="range"/>
            </div>
            </form>
        </div>
    </div>
    );
}

export default OrdersClient
