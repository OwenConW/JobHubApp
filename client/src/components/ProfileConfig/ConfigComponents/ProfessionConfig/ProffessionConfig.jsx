import React from "react";
import s from './ProfessionConfig.module.scss'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Nuestros Archivos
import { getLocalStorage } from '../../../../handlers/localStorage';
import { actionGetAllJobs } from "../../../../redux/jobActions";
import CardProfessions from "../../../CardProfessions/CardProfessions";
import { changeValidator, PremiumValidator } from "../../../../handlers/ChangeValidator";

//Agregados
import deleteIcon from './assets/Recycle Bin Full.png'

const ProfessionConfig = () => {
  const dispatch = useDispatch()

  let activeUser = getLocalStorage()

  const allProfessions = useSelector((state) => state.jobs.jobs)
  // console.log('allProfessions', allProfessions)

  //USER LOCAL PARA ENVIAR A BASE DE DATOS EN CASO DE HACER CAMBIOS
  const [user, setUser] = useState({
    id: activeUser.id,
    name: activeUser.name,
    last_Name: activeUser.last_Name,
    description: activeUser.description,
    dni: activeUser.dni,
    image: activeUser.image,
    date_of_Birth: activeUser.date_of_Birth,
    mail: activeUser.mail,
    phone: activeUser.phone,
    country: activeUser.country,
    city: activeUser.city,
    coordinate: activeUser.coordinate,
    street: activeUser.street,
    address: activeUser.address,
    rating: activeUser.rating,
    isPremium: activeUser.isPremium,
    isProfessional: activeUser.isProfessional,
    isAdmin: activeUser.isAdmin,
    isBanned: activeUser.isBanned,
    isActive: activeUser.isActive,
    professions: activeUser.professions,
    reviews: activeUser.reviews
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

  const deleteProfession = (event) => {
    setUser({
      ...user,
      professions: user.professions.filter(profession => profession !== event.target.name)
    })
  }

  const addProfession = (event) => {
    if (user.professions.includes(event.target.value)) return
    setUser({
      ...user,
      professions: [...user.professions, event.target.value]
    })
  }


  const handleSubmit = () => {
    
  }

  useEffect(() => {
    // console.log(user)
    console.log(user.professions)
  }, [user])



  return (
    <div className={s.container}>

      <div className={s.inputDiv}>
        <div>Profesiones</div>
        <select name='professions' value={user.professions} onChange={(event) => addProfession(event)} disabled={PremiumValidator(user.isPremium, user.professions)}>

          <option key={'none'} value=''>Profesiones</option>
          {
            allProfessions.map(profession => {
              return (
                <option value={profession.name} key={profession.name}>{profession.name}</option>
              )
            })
          }

        </select>
      </div>
      { PremiumValidator(user.isPremium, user.professions) ? <div className={s.premiumSpam}>Contrate premium para mas profesiones!</div> : <></> }

      <div className={s.professionList}>
        {user.professions && user.professions.length ? (
          user.professions.map(job => (
            <duv className={s.individualProfession}>
              <CardProfessions job={{name: job}} />
              <img src={deleteIcon} name={job} onClick={deleteProfession} />
            </duv>
          ))
        ) : (
          <div>
            AUN NO TIENES PROFESIONES
          </div>
        )}
      </div>

      <input type="submit" className={s.submit} onClick={(e) => handleSubmit(e)} disabled={changeValidator(activeUser, user)} />

    </div>
  )


}


export default ProfessionConfig