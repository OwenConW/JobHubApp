import React from "react";
import Edit from "./Edit/Edit";
import ProfessionConfig from './ProfessionConfig/ProffessionConfig'



const ConfigPages = (configPage) => {
let option = configPage.configPage
    if (option === 'edit') {
        return (
            <Edit/>
            )
    }
    // if (option === 'password') {
    //     return (
    //         <ProfessionConfig/>
    //         )
    // }
    if (option === 'notifications') {
        return (
            <Edit/>
            )
    }
    if (option === 'professions') {
        return (
            <ProfessionConfig/>
            )
    }
    if (option === 'premium') {
        return (
            <Edit/>
            )
    }

}


export default ConfigPages