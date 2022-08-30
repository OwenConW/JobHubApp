import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import s from './OrdersClient.module.scss';
import Loader from '../../Login/Loader/Loader';
import Swal from 'sweetalert2';

const OrdersClient = ({order, activeUser, setCli, clientOrders}) => {
    const [professional, setProfessional] = useState([]);
    const [onReview, setOnReview] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [opinion, setOpinion] = useState({
        feedback_client: '',
        rating: 0,
        id_orders: order.id,
        id_user_client: activeUser.id,
    })

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

    const handleChange = (e) => {
        setError('');
        setOpinion({
            ...opinion,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        Swal.fire({
            title: 'Publicar reseña?',
            text: "Podrás modificarla en la configuración de tu perfil.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#2C666E',
            cancelButtonColor: '#4e4e4e',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Enviar'
          }).then((result) => {
            if (result.isConfirmed) {
                let body = {
                    complete: true,
                    allowReview: true,
                }
                axios.post(`/review/${order.id_user_professional}`, opinion)
                .then(() => axios.put(`/orders/${order.id}`, body)).then(() => {
                    setCli(clientOrders.filter(o => o.id !== order.id));
                    setLoading(false);
                    Swal.fire({
                        title: 'Se ha publicado tu reseña.',
                        text: "Gracias por puntuar a los usuarios :)",
                        icon: 'success',
                        confirmButtonColor: '#2C666E',
                    })
                })
          }else{
            setLoading(false);
          }
        })

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

                <div className={s.btn} onClick={handleReview}>{onReview ? 'Cerrar' : 'Abrir'}</div>

            </div>
        </div>
        <div className={s.opinion}>
            <form className={s.form} onSubmit={e => handleSubmit(e)}>
                <div className={s.inputs}>
                    <div className={s.description}>
                        <label>Mensaje</label>
                        <textarea name='feedback_client' value={opinion.feedback_client} onChange={(e) => handleChange(e)} required></textarea>
                    </div>
                    <div className={s.barra}>
                        <label>Puntaje</label>
                        <p>{opinion.rating}</p>
                        <input
                            name="rating"
                            max="5"
                            value={opinion.rating}
                            step="0.5"
                            type="range"
                            onChange={(e) => handleChange(e)}
                            required
                            />
                    </div>
                </div>
                <div className={s.submit}>
                    {loading ? <Loader/> : <button className={s.btnSubmit} type='submit'>Enviar reseña</button>}
                    {error ? <p>{error}</p> : ''}
                </div>
            </form>
        </div>
    </div>
    );
}

export default OrdersClient
