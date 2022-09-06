import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getClaimsByProfessionalIdForAdmin, getAllClaimsForAdmin, getClaimsByClientIdForAdmin } from '../../../redux/adminActions'
import ReportCard from './ReportCard/ReportCard'
import s from './ReportsAdminPanel.module.scss'

export default function ReportsAdminPanel() {
  const dispatch = useDispatch()

  const [searchInput, setSearchInput] = useState({ claim_user_professional_id: '', claim_user_client_id: '' })
  const claims = useSelector(state => state.admin.claims)

  function handleInputChange(e) {
    setSearchInput({...searchInput, [e.target.name]: e.target.value})
  }

  function handleGetAllClaims(e) {
    dispatch(getAllClaimsForAdmin())
  }

  function handleSubmitByUserClientId(e){
    e.preventDefault()
    if (!searchInput.claim_user_client_id) return
    dispatch(getClaimsByClientIdForAdmin(searchInput.claim_user_client_id))
  }
  function handleSubmitByUserProfessionalId(e){
    e.preventDefault()
    if (!searchInput.claim_user_professional_id) return
    dispatch(getClaimsByProfessionalIdForAdmin(searchInput.claim_user_professional_id))
  }

  useEffect(() => {
    console.log(searchInput);
  },[searchInput])

  return (
    <div>
      <div className={s.formsContainer}>
        <form onSubmit={handleSubmitByUserProfessionalId}>
          <label htmlFor="claim_user_professional_id">Buscar reporte por ID del usuario profesional</label>
          <input type="text" name="claim_user_professional_id" onChange={handleInputChange} />
          <input className={s.submitBtn} type="submit" value="buscar" />
        </form>
        <form onSubmit={handleSubmitByUserClientId}>
          <label htmlFor="claim_user_client_id">Buscar reporte por ID del usuario cliente</label>
          <input type="text" name="claim_user_client_id" onChange={handleInputChange} />
          <input className={s.submitBtn} type="submit" value="buscar" />
        </form>
        <button onClick={handleGetAllClaims}>Traer todos los reportes</button>
      </div>
      <div className={s.cardsContainer}>
        {
        claims.length ? claims?.map( c => {
          return <ReportCard key={c.id} {...c}/>
        }) : 
        <h1>No tiene reportes.</h1>
        }
      </div>
    </div>
  )
}
