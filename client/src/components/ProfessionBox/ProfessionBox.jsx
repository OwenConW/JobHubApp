import React from "react";
import s from './ProfessionBox.module.scss'
import CardProfessions from '../CardProfessions/CardProfessions.jsx'

const ProfessionBox = (professional) => {
  let jobs = professional.professional.professions

  return (
    <div className={s.professionList}>
        {jobs && jobs.length ? (
        jobs.map(job => (
          <CardProfessions job={job} />
        ))
      ) : (
        <div>
          NO ENCONTRAMOS PROFESIONES
        </div>
      )}
    </div>
  )
}

export default ProfessionBox