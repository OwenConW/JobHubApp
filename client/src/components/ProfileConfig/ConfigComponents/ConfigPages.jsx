import React from "react";
import Edit from "./Edit/Edit";
import ProfessionConfig from './ProfessionConfig/ProffessionConfig'
import Opinions from './Opinions/Opinions'
import OtherReviews from "./ReviewsAboutMe/OtherReviews";
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
    //     return (
    //         <Edit/>
    //         )
    // }


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


    if (option === 'otherReviews') {
        return (
            <OtherReviews/>
            )
    }

}


export default ConfigPages