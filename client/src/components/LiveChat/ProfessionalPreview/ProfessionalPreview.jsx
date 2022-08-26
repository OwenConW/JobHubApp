import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import s from './ProfessionalPreview.module.scss';

const ProfessionalPreview = ({id}) => {
    const [professional, setProfessional] = useState({});

    useEffect(()=>{
        const fetchUser = async() =>{
            try{
                let response = await axios.get(`/users/${id}`);
                setProfessional(response.data);
                console.log(response.data);
            }catch(e){
                console.log(e)
            }
        }

        fetchUser();
    }, [id]);

  return (
    <div className={s.container}>
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
    </div>
  )
}

export default ProfessionalPreview;