import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import s from './ProfessionalPreview.module.scss';
import corona from "./asset/corona.png"
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
        </>
        )
      }
        
    </div>
  )
}

export default ProfessionalPreview;