import React, { useEffect } from "react";
import s from './Filter.module.scss';

const placeHolderDb = [
  {
    id: 1,
    name: "plomero"
  },
  {
    id: 2,
    name: "electricista"
  },
  {
    id: 3,
    name: "gasista"
  },
  {
    id: 4,
    name: "programador"
  },
]

function Filter(props) {

const { addFilterValue } = props;

function handleClick(e){
  addFilterValue(e.target.name, e.target.value)
}

useEffect(() => {
//Call to professions from DB
},[])

  return (
    <div className={s.filterContainer}>
      <div className={s.allButtonsContainer}>
        <div className={s.professionsButtonsContainer}>
          <button key={0} type="button" onClick={handleClick} name="profession" value="">Todas las profesiones</button>
          {placeHolderDb?.map(profession => {
            return (
              <button key={profession.id}
              type="button"
              onClick={handleClick}
                      name="profession"
                      value={profession.id}
                      > {profession.name} </button>
                  )
          })}
        </div>
        <button className={s.ratingBtn} type="button" value="ASC" name="rating" onClick={handleClick}>Rating ↑</button>
      </div>
    </div>
  )
}


export default Filter;