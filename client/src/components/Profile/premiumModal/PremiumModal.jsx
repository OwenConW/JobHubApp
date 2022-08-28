import React from "react";
import s from './PremiumModal.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { actionFetchingMercadopagoLink, 
         actionClearMercadopagoRedirectLink, 
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
  },[dispatch])

  return(
    <div className={s.modalContainer}>
      <h1>{name[0].toUpperCase() + name.substring(1)} estos son los beneficios de un usuario premium!</h1>

        <ul className={s.benefitsContainer}>
<<<<<<< HEAD
          <li>Beneficio 1 Lorem ipsum dolor sit amet.</li>
          <li>Beneficio 2 Lorem ipsum dolor sit amet consectetur adipisicing.</li>
          <li>Beneficio 3 Lorem ipsum dolor sit amet consectetur.</li>
          <li>Beneficio 4 Lorem, ipsum dolor.</li>
          <li>Beneficio 5 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis!.</li>
=======
          <li>Mas visibilidad en toda la página.</li>
          <li>Saldras primero y destacado en las busquedas por nombre u oficio.</li>
          <li>Podras agregar y ejercer más de un trabajo en la página.</li>
          <li>Podras tener un gif de perfil.</li>
          <li>Podras buscar profesionales a mayor distancia.</li>
>>>>>>> 86f7172ceaa43944b7f56638ff8e0d7a86f07ae2
        </ul>

      <div className={s.fetchingMessagesAndButtonsContainer}>
          {
            fetchingMercadoPagoLink? <h1>Muchas gracias, te estamos redireccionando!</h1> :
            <div className={s.errorAndBtnsContainer}>
              <h1 className={!fetchingMercadoPagoLinkFailure? `${s.errorDisplay}` : null}>Hubo un error, por favor intenta de nuevo.</h1> 
              <div className={s.buttonsContainer}>
                <button type="button" className={s.btnReject} onClick={handlePremium}>En otra ocación</button>
                <button type="button" name="accept-btn" className={s.btnAccept} onClick={handlePremium}>Suscribirse</button>
              </div>
            </div>
          }
      </div>
    </div>
  )

}


export default PremiumModal;