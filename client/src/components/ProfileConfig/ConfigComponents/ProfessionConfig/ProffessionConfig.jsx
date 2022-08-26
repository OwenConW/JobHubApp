import React from "react";
import s from './ProfessionConfig.module.scss'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Nuestros Archivos
import { getLocalStorage } from '../../../../handlers/localStorage';
import { actionGetAllJobs } from "../../../../redux/jobActions";
import CardProfessions from "../../../CardProfessions/CardProfessions";
import { changeValidator, PremiumValidator } from "../../../../handlers/ChangeValidator";
import { getCharsById, modifyProfessions } from "../../../../redux/userActions";

//Agregados
import deleteIcon from './assets/Recycle Bin Full.png'

const ProfessionConfig = () => {
  const dispatch = useDispatch()

  let activeUser = getLocalStorage()

  let comparative = useSelector((state) => state.users.detail)
 

  const allProfessions = useSelector((state) => state.jobs.jobs)
  // console.log('allProfessions', allProfessions)

  //USER LOCAL PARA ENVIAR A BASE DE DATOS EN CASO DE HACER CAMBIOS
  const [user, setUser] = useState({
    professions: comparative.professions,
  })

  useEffect(() => {
    // console.log(user)
    dispatch(actionGetAllJobs())
    dispatch(getCharsById(activeUser.id))
  }, [])

  const deleteProfession = (event) => {
    setUser({
      ...user,
      professions: user.professions.filter(profession => profession.name !== event.target.name)
    })
    console.log(user)
  }

  const addProfession = (event) => {
    console.log(user.professions)
    if(!user.professions){
      user.professions = []
    }
    if (user.professions.includes(event.target.value)) return
    setUser({
      ...user,
      professions: [...user.professions, {name: event.target.value}]
    })
  }


  const handleSubmit = (event) => {
    let newProfessions = user.professions.map(prof => prof.name )
    modifyProfessions(activeUser.id, {...activeUser, professions: newProfessions})
    dispatch(getCharsById(activeUser.id))
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
      { PremiumValidator(activeUser.isPremium, user.professions) ? <div className={s.premiumSpam}>Contrate premium para mas profesiones!</div> : <></> }

      <div className={s.professionList}>
        {user.professions && user.professions.length ? (
          user.professions.map(job => (
            <div className={s.individualProfession} key={job}>
              <CardProfessions job={job} />
              <img src={deleteIcon} name={job.name} onClick={deleteProfession} />
            </div>
          ))
        ) : (
          <div>
            AUN NO TIENES PROFESIONES
          </div>
        )}
      </div>

      <input type="submit" className={s.submit} onClick={handleSubmit} disabled={changeValidator({professions: comparative.professions}, user)} />

    </div>
  )


}


export default ProfessionConfig