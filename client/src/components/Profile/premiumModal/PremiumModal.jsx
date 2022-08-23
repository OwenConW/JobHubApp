import React from "react";
import axios from "axios";
import s from './PremiumModal.module.scss'


function PremiumModal(props) {

  const { mail, name, handlePremiumModal } = props;


    const handlePremium = async (e) => {
      if(e.target.name === "accept-btn"){
        const premiumReq = await axios.get(`/pagos/premium?mail=${mail}`)
        window.location.replace(premiumReq.data)
        await axios.get(`/mails/premiumspam?mail=${mail}&name=${name}`)
        return
      }
    handlePremiumModal()
  }

  return(
    <div className={s.modalContainer}>
      <h1>{name} te ofrecemos estos beneficios por ser Premium!</h1>

        <ul className={s.benefitsContainer}>
          <li>Beneficio 1 Lorem ipsum dolor sit amet.</li>
          <li>Beneficio 2 Lorem ipsum dolor sit amet consectetur adipisicing.</li>
          <li>Beneficio 3 Lorem ipsum dolor sit amet consectetur.</li>
          <li>Beneficio 4 Lorem, ipsum dolor.</li>
          <li>Beneficio 4 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis!.</li>
        </ul>

      <div className={s.buttonsContainer}>
        <button type="button" className={s.btnReject} onClick={handlePremium}>Ni en pedo</button>
        <button type="button" name="accept-btn" className={s.btnAccept} onClick={handlePremium}>Claro que si Rey!</button>
      </div>
    </div>
  )

}


export default PremiumModal;