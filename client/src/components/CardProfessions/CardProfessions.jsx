import React from "react";
import s from './CardProfessions.module.scss';


let job = { name: 'Electricista', description: 'descripcion de la tarea', rating: 4.2, reviews: 25 }

const CardProfessions = () => {
return (
    <div className={s.professionComponent}>
        <div className={s.professionAndDescription}>
            <h1>{job.name}</h1>
            <h2>{job.description}</h2>
        </div>
        <div className={s.professionStats}>
            <h3>Reseñas</h3>
            <h4>{job.reviews}</h4>
        </div>
        <div className={s.professionStats}>
            <h3>Calificación</h3>
            <h4>{job.rating}</h4>
        </div>
    </div>
    )
}

export default CardProfessions

