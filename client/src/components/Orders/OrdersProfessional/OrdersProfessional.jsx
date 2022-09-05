import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import s from './OrdersProfessional.module.scss';
import Swal from 'sweetalert2';

const OrdersProfessional = ({ order, setProf, profOrders }) => {
    const [client, setClient] = useState([]);
    const [orderView, setOrderView] = useState(false)
    const [orderDescription, setOrderDescription] = useState({
        description: '',
        appointment_date: '',
        // isActive: true,
    })

    useEffect(() => {
        const fetchUser = async () => {
            let response = await axios.get(`/users/${order.id_user_client}`);

            setClient(response.data);

        }

        fetchUser();
    }, [])


    const handleComplete = () => {
        orderView ? setOrderView(false) : setOrderView(true)
    }

    // SUBMIT DE LA ORDEN
    const handleConfirm = (e) => {
        e.preventDefault()
        Swal.fire({
            title: 'Seguro?',
            text: "Al completar, habilitas al cliente a puntuarte.",
            icon: 'question',
            width: 600,
            padding: '3em',
            color: '#dfdddd',
            background: '#2C666E',
            backdrop: `
            rgba(172,172,172,0.5424720913756127)`,
            showCancelButton: true,
            confirmButtonColor: '#2C666E',
            cancelButtonColor: '#4e4e4e',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Completar'
        }).then((result) => {
            let body = {
                description: orderDescription.description,
                complete: false,
                allowReview: true,
                appointment_date: orderDescription.appointment_date.slice(0,10).split('-').reverse().join("-"),
                // isActive: true,
            }
            if (result.isConfirmed) {
                axios.put(`/orders/${order.id}`, body).then(() => setProf(profOrders.filter(p => p.id !== order.id)))
                .then(() => Swal.fire({
                    title: 'Genial!',
                    text: "Ahora el cliente podrá puntuarte",
                    icon: 'success',
                    confirmButtonColor: '#2C666E',
                    width: 600,
                    padding: '3em',
                    color: '#dfdddd',
                    background: '#2C666E',
                    backdrop: `
                    rgba(172,172,172,0.5424720913756127)`,
                }))
             }
          })
    }

    const handleCancel = (e) => {
        e.preventDefault()
        Swal.fire({
            title: 'Seguro?',
            text: "Al cancelar, daras por cerrada la orden. Ademas, el cliente no podra puntuarte",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#2C666E',
            cancelButtonColor: '#4e4e4e',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar'
        }).then((result) => {
            let body = {
                complete: true,
                allowReview: false,
                isActive: false,
            }
            if (result.isConfirmed) {
                axios.put(`/orders/${order.id}`, body).then(() => setProf(profOrders.filter(p => p.id !== order.id)))
                    .then(() => Swal.fire({
                        title: 'Genial!',
                        text: "La orden fue cancelada",
                        icon: 'success',
                        confirmButtonColor: '#2C666E',
                    }))
            }
        })
    }


    const handleChange = (e) => {
            setOrderDescription({
                ...orderDescription,
                [e.target.name]: e.target.value,
            })
    }

    let minDate = new Date().toLocaleDateString('en-ca')
    useEffect(() => {
        console.log(orderDescription)
    }, [orderDescription])


    return (
        // <div className={orderView? s.order : s.order} key={client.id}>
        //     <div className={s.img}>
        //         <img src={client.image} alt="" />
        //     </div>
        //     <div className={s.userdata}>
        //         <p className={s.name}>{client.name} {client.last_Name}</p>
        //         <p className={s.location}>{client.city}, {client.country}</p>
        //     </div>
        //     <div className={s.btndiv}>
        //         <div className={s.btn} onClick={() => handleComplete()}>Completar</div>
        //     </div>

        // </div>

        <div className={orderView ? s.review : s.order} key={client.id}>
            <div className={s.info}>
                <div className={s.img}>
                    <img src={client.image} alt="" />
                </div>
                <div className={s.userdata}>
                    <p className={s.name}>{client.name} {client.last_Name}</p>
                    <p className={s.location}>{client.city}, {client.country}</p>
                </div>
                <div className={s.btndiv}>

                    <div className={s.btn} onClick={handleComplete}>{orderView ? 'Cerrar' : 'Abrir'}</div>

                </div>
            </div>
            <div className={s.opinion}>
                <form className={s.form}>
                    <div className={s.inputs}>
                        <div className={s.description}>
                            <label>Detalle del trabajo</label>
                            <textarea name='description' value={orderDescription.description} onChange={(e) => handleChange(e)} required></textarea>
                        </div>
                        <div className={s.moreInfo}>
                            <div className={s.date}>
                                <label>Fecha</label>
                                <div>
                                <input type="date" name="appointment_date" value={orderDescription.appointment_date} min={minDate} required onChange={(e) => handleChange(e)}/>
                                </div>
                               
                               
                            </div>
                            <div className={s.orderId}>
                                <h1>Orden: {order.id}</h1>
                            </div>
                        </div>
                    </div>
                    <div className={s.submit}>
                        {/* {loading ? <Loader/> : } */}
                        <button className={s.btnSubmit} type='submit'onClick={(e) => handleCancel(e)}>Cancelar</button>
                        <button className={s.btnSubmit} type='submit' onClick={(e) => handleConfirm(e)}>Completar</button>
                        {/* {error ? <p>{error}</p> : ''} */}
                    </div>
                </form>
            </div>
        </div>



    )

}

export default OrdersProfessional;


