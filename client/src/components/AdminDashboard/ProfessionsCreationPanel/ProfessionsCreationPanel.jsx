import React from "react";
import { useState } from "react";
import Profession from './Profession/Profession'
import DeleteModal from "./Profession/DeleteModal/DeleteModal";

function ProfessionsCreationPanel(props) {
  const { professions } = props;


  return(
    <div>
      <div>
        {professions?.map(p => {
          return(
            <Profession {...p}/>
          )
        })}
      </div>
    </div>
  )
}


export default ProfessionsCreationPanel;