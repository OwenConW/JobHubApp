import React from "react";
import s from './PremiumModal.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { actionFetchingMercadopagoLink, 
         actionClearMercadopagoRedirectLink, 
         actionFetchingMercadopagoLinkFailure, 
         actionSetFetchingMercadoPagoLinkFalse } from '../../../redux/fetchingActions'
import { useEffect } from "react";


function PremiumModal(props) {

  const { mail, name, handlePremiumModal } = props;

  const dispatch = useDispatch()
  const mercadopagoRedirectLink = useSelector(state => state.fetching.mercadopagoRedirectLink)
  const fetchingMercadoPagoLink = useSelector(state => state.fetching.fetchingMercadoPagoLink)
  const fetchingMercadoPagoLinkFailure = useSelector(state => state.fetching.fetchingMercadoPagoLinkFailure)

  const handlePremium = async (e) => {
    if(e.target.name === "accept-btn"){
      dispatch(actionFetchingMercadopagoLink(mail))
      //await axios.get(`/mails/premiumspam?mail=${mail}&name=${name}`)
      return
    }
    dispatch(actionClearMercadopagoRedirectLink())
    handlePremiumModal()
  }
    
  useEffect(() => {
    return () => {
      dispatch(actionClearMercadopagoRedirectLink())
    }
  }, [dispatch])

  useEffect(() => {
    if(mercadopagoRedirectLink) {
      window.location.replace(mercadopagoRedirectLink)
    } 
  }, [mercadopagoRedirectLink])

  useEffect(() => {
    dispatch(actionSetFetchingMercadoPagoLinkFalse())
  },[])

  return(
    <div className={s.modalContainer}>
      <h1>{name} te ofrecemos estos beneficios por ser Premium!</h1>

        <ul className={s.benefitsContainer}>
          <li>Beneficio 1 Lorem ipsum dolor sit amet.</li>
          <li>Beneficio 2 Lorem ipsum dolor sit amet consectetur adipisicing.</li>
          <li>Beneficio 3 Lorem ipsum dolor sit amet consectetur.</li>
          <li>Beneficio 4 Lorem, ipsum dolor.</li>
          <li>Beneficio 5 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis!.</li>
        </ul>

      <div className={s.fetchingMessagesAndButtonsContainer}>
          {
            fetchingMercadoPagoLink? <h1>Muchas gracias, te estamos redireccionando!</h1> :
            <div className={s.errorAndBtnsContainer}>
              <h1 className={!fetchingMercadoPagoLinkFailure? `${s.errorDisplay}` : null}>Hubo un error, por favor intenta de nuevo.</h1> 
              <div className={s.buttonsContainer}>
                <button type="button" className={s.btnReject} onClick={handlePremium}>Ni en pedo</button>
                <button type="button" name="accept-btn" className={s.btnAccept} onClick={handlePremium}>Claro que si Rey!</button>
              </div>
            </div>
          }
      </div>
    </div>
  )

}


export default PremiumModal;