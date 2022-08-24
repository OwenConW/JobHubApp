import React from "react";
import s from './ProfessionConfig.module.scss'
import { getLocalStorage } from '../../../../handlers/localStorage';
import { useState, useEffect } from "react";
import { validators } from "../../../../handlers/validators";
import { actionGetAllJobs } from "../../../../redux/jobActions";
import { useDispatch, useSelector } from "react-redux";
import CardProfessions from "../../../CardProfessions/CardProfessions";

const ProfessionConfig = () => {
  const dispatch = useDispatch()

  let activeUser = getLocalStorage()

  const allProfessions = useSelector((state) => state.jobs.jobs)
  // console.log('allProfessions', allProfessions)

  //USER LOCAL PARA ENVIAR A BASE DE DATOS EN CASO DE HACER CAMBIOS
  const [user, setUser] = useState({
    name: activeUser.name,
    last_Name: activeUser.last_Name,
    description: activeUser.description,
    mail: activeUser.mail,
    dni: activeUser.dni,
    image: activeUser.image,
    phone: activeUser.phone,
    country: activeUser.country,
    city: activeUser.city,
    coordinate: activeUser.coordinate,
    professions: activeUser.professions,
    isPremium: activeUser.isPremium
  })

  //HandleChange de inputs
  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  }

  useEffect(() => {
    // console.log(user)
    dispatch(actionGetAllJobs())
  }, [])


  return (
    <div className={s.container}>
    
      <div className={s.inputDiv}>
        <div>Profesiones</div>
        <select name='professions' value={user.professions} onChange={(event) => handleChange(event)}>

          <option key={'none'} value='none'>Profesiones</option>
          {
            allProfessions.map(profession => {
              return (
                <option value={profession.name} key={profession.name}>{profession.name}</option>
              )
            })
          }

        </select>
      </div>

      <div className={s.professionList}>
        {activeUser.professions && activeUser.professions.length ? (
        activeUser.professions.map(job => (
          <duv className={s.individualProfession}> 
          <CardProfessions job={job} />
          </duv>
        ))
      ) : (
        <div>
          AUN NO TIENES PROFESIONES
        </div>
      )}
    </div>


    </div>
  )


}


export default ProfessionConfig