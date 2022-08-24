import React from "react";
import Edit from "./Edit/Edit";
import ProfessionConfig from './ProfessionConfig/ProffessionConfig'
import { getLocalStorage } from '../../../handlers/localStorage.js';


const ConfigPages = (configPage) => {
    const activeUser = getLocalStorage()
let option = configPage.configPage
    if (option === 'edit') {
        return (
            <Edit/>
            )
    }

    // if (option === 'notifications') {
    //     return (
    //         <Edit/>
    //         )
    // }


    if (option === 'professions') {
        if(activeUser.isProfessional){
            return (
                <ProfessionConfig/>
                )
        } else return <Edit/>
        
    }

    
    // if (option === 'premium') {
    //     return (
    //         <Edit/>
    //         )
    // }

}


export default ConfigPages