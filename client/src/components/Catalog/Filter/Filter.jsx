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
      <select onChange={handleClick} name="profession" id="profression">
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