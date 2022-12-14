import React from "react";
import Edit from "./Edit/Edit";
import ProfessionConfig from './ProfessionConfig/ProffessionConfig';
import Orders from './Orders/Orders';
import Opinions from './Opinions/Opinions'
import OtherReviews from "./ReviewsAboutMe/OtherReviews";
import Images from "./Images/Images"
import Premium from "./Premium/Premium"

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
        return(
            <Opinions />
        )
    }


    if (option === 'premium') {
        return (
            <Premium/>
            )
    }


    if (option === "images"){
        return (
            <Images/>
        )
    }

    if (option === 'otherReviews') {
        return (
            <OtherReviews/>
            )
    }


}


export default ConfigPages