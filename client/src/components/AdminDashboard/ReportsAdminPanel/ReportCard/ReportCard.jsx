import React from 'react'
import s from "./ReportCard.module.scss"


export default function ReportCard(props) {
  const { id, id_user_professional, id_user_client, feedback_claims, date_created } = props;


  return (
    <div className={s.mainContainer}>
      <div className={s.claimDataContainer}>
        <h3 className={s.claimId}>ID: {id}</h3>
        <div className={s.idsContainer}>
          <h3>ID usuario profesional: {id_user_professional}</h3>
          <h3>ID usuario cliente: {id_user_client}</h3>
        </div>
        <div className={s.dateAndActiveContainer}>
          <h3>Fecha de creación: {date_created}</h3>
          {/* <div className={s.activeContainer}>
            <h3>Activa?</h3>
            <h3>{isActive ? "Si" : "No"}</h3>
          </div> */}
        </div>
      </div>
      <div className={s.descriptionContainer}>
        <h3>Descripción: {feedback_claims}</h3>
      </div>
    </div>
  )
}
