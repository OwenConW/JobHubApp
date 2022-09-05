import React from "react";
import s from './CardProfessions.module.scss';



const CardProfessions = (job) => {
    let profession = job.job

    if(typeof(profession) === "string"){
        let job = profession
        profession = {name: job}
    }

    return (
    <div className={s.professionComponent}>
        <div className={s.professionAndDescription}>
            <h1 key={profession.name}>{profession.name}</h1>
        </div>

    </div>
    )
}

export default CardProfessions

