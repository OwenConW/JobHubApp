import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import s from './ProfessionalPreview.module.scss';
import corona from "./asset/corona.png";
import { getLocalStorage } from '../../../handlers/localStorage';
import Swal from 'sweetalert2';

const ProfessionalPreview = ({id}) => {
    let activeUser = getLocalStorage();
    const [professional, setProfessional] = useState({});
    const [activeCoversation, setActiveConversation] = useState({});

    useEffect(()=>{
        const fetchUser = async() =>{
            try{
                let response = await axios.get(`/users/${id}`);
                setProfessional(response.data);
            }catch(e){
                console.log(e)
            }
        }

        const fetchConversation = async() =>{
            try{
                let response = await axios.get(`/conversation/${activeUser.id}`);
                let active = response.data.filter(chat => chat.receptor_id === activeUser.id && chat.emisor_id === id);
                setActiveConversation(active[0]);
            }catch(e){
                console.log(e);
            }
        }

        fetchUser();
        fetchConversation();
    }, [id]);

    const handleCoordinate = async() => {
        Swal.fire({
            title: 'Seguro?',
            text: "Al crear la orden deberas completar los datos en la seccion ordenes.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#2C666E',
            cancelButtonColor: '#4e4e4e',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar'
        }).then((result) => {
            if (result.isConfirmed) {
                let body = {
                    id_user_client: id * 1,
                    id_user_professional : activeUser.id,
                    }
                axios.post('/orders', body)
                .then(() => Swal.fire({
                    title: 'Orden creada',
                    text: "Se creo la orden, completala en la seccion de ordenes.",
                    icon: 'success',
                    confirmButtonColor: '#2C666E',
                }))
            }
        })
    }

  return (
    <div className={s.container}>
      {
        professional.isPremium ? (
            <>
            <div className={s.professionalImg}>
            <img src={professional?.image} alt="professional" className={s.imagePremium} />
        </div>
        <div className={s.professionaldata}>
            <p className={s.professionalName}>{professional?.name} {professional?.last_Name} <img src={corona} alt="" className={s.corona}/></p>
            <p className={s.professionalCity}>
                {professional?.city} {professional?.country}
            </p>
            <p className={s.professionalDescription}>
                {professional?.description}
            </p>
        </div>
        </>
        ) : (
            <>
            <div className={s.professionalImg}>
            <img src={professional?.image} alt="professional" />
        </div>
        <div className={s.professionaldata}>
            <p className={s.professionalName}>{professional?.name} {professional?.last_Name}</p>
            <p className={s.professionalCity}>
                {professional?.city} {professional?.country}
            </p>
            <p className={s.professionalDescription}>
                {professional?.description}
            </p>
        </div>

        {activeCoversation?.receptor_id === activeUser?.id ?
        <div className={s.generateOrder}>
            <div className={s.generatebtn} onClick={handleCoordinate}>Registrar Cita</div>
            <p>ℹ️ Para poder ser puntuado por tu cliente, deberías registrar una cita.</p>
        </div>
        : ''}
        </>
        )
      }
    </div>
  )
}

export default ProfessionalPreview;