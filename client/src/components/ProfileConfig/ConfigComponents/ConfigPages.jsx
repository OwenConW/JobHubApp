import React from "react";
import Edit from "./Edit/Edit";
import ProfessionConfig from './ProfessionConfig/ProffessionConfig';
import Orders from './Orders/Orders';
// import Opinions from './Opinions/Opinions'
import { getLocalStorage } from '../../../handlers/localStorage.js';


const ConfigPages = (configPage) => {
    const activeUser = getLocalStorage()
    let option = configPage.configPage
    
    if (option === 'edit') {
        return (
            <Edit />
        )
    }

    // if (option === 'notifications') {
    //     return (d
    //         <Edit/>
    //         )
    // }

    if (option === 'orders') {
        return (
            <Orders />
        )
    }



    if (option === 'professions') {
        if (activeUser.isProfessional) {
            return (
                <ProfessionConfig />
            )
        } else return <Edit />

    }

    if (option === 'opinions') {
        // <Opinions />
    }

    // if (option === 'premium') {
    //     return (
    //         <Edit/>
    //         )
    // }
}


export default ConfigPages