import React, { useEffect } from "react";

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
    <div>
      <button type="button" value="ASC" name="rating-order" onClick={handleClick}>Rating ↑</button>
      <select onChange={handleClick} name="profession" id="profression">
      <option key="all-professions"
              name="all-professions"
              value="all-professions"
              > All Professions </option>
        {placeHolderDb?.map(profession => {
          return (
            <option key={profession.id}
                    name={profession.name} 
                    value={profession.id}
                   > {profession.name} </option>
          )
        })}
      </select>
    </div>
  )
}


export default Filter;