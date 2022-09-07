import React from "react";
import s from './ProfessionConfig.module.scss'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

//Nuestros Archivos
import { getLocalStorage } from '../../../../handlers/localStorage';
// eslint-disable-next-line no-unused-vars
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


  //USER LOCAL PARA ENVIAR A BASE DE DATOS EN CASO DE HACER CAMBIOS
  const [user, setUser] = useState({
    profession: comparative.professions,
  })



  const deleteProfession = (event) => {
    setUser({
      ...user,
      profession: user.profession.filter(prof => prof.name !== event.target.name)
    })
    console.log(user)
  }

  const addProfession = (event) => {
    // console.log(user.professions)
    if(!user.profession){
      user.profession = []
    }
    let addValidator = true
    for(let x = 0; x < user.profession.length; x++){
      if (user.profession[x].name === event.target.value){
        addValidator = false
        break
      }
    }
    if(addValidator){
      setUser({
        ...user,
        profession: [...user.profession, {name: event.target.value}]
      })
    }
  }


  const handleSubmit = () => {
    let newProfessions = user.profession.map(prof => prof.name )
    modifyProfessions(activeUser.id, {...activeUser, profession: newProfessions})
    //console.log('submit professions:', user.profession)
    Swal.fire({
      icon: 'success',
      title: 'Cambios Guardados',
      showConfirmButton: false,
      timer: 1500
    })
    dispatch(getCharsById(activeUser.id))
  }


  useEffect(() => {
    //console.log(user.profession)
  }, [user])

  const disableSelector = () => {
    if(activeUser.isPremium){
      return false
    }else if (user?.profession?.length > 0){
      return true
    }else{
      return false
    }
    
  }





  return (
    <div className={s.container}>

      <div className={s.inputDiv}>
        <div>Profesiones</div>
        <select name='professions' value={user.profession} onChange={(event) => addProfession(event)} disabled={disableSelector()}>

          <option key={'none'} value=''>Profesiones</option>
          {
            allProfessions.map(prof => {
              return (
                <option value={prof.name} key={prof.name}>{prof.name}</option>
              )
            })
          }

        </select>
      </div>
      { PremiumValidator(activeUser.isPremium, user.profession) ? <div className={s.premiumSpam}>Contrate premium para mas profesiones!</div> : <></> }

      <div className={s.professionList}>
        {user.profession && user.profession.length ? (
          user.profession.map(job => (
            <div className={s.individualProfession} key={job}>
              <CardProfessions job={job} />
              <img src={deleteIcon} name={job.name} onClick={deleteProfession} alt=""/>
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