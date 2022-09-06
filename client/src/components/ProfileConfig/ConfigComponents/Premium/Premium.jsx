import React from "react"
import * as functions from "../../../../handlers/localStorage"
import s from "./Premium.module.scss"
import check from "./assets/comprobado.png"
import corona from "./assets/corona.png"
import sad from "./assets/sadface.png"
import rocket from "./assets/rocket.png"
import etiqueta from "./assets/etiqueta-del-precio.png"
import activo from "./assets/activo.png"
import calendar from "./assets/calendar.png"


const Premium = () => {

    const activeUser = functions.getLocalStorage()
  

    return (
      <div className={s.contenedorPadre}>
        <h1 className={s.titleActivo}>
          {activeUser.isPremium
            ? `JobHub Premium Activo`
            : "JobHub Premium NO Activo "}
          {activeUser.isPremium ? (
            <img className={s.corona} src={corona} alt="" />
          ) : (
            <img className={s.corona} src={sad} alt="" />
          )}
        </h1>
        <div className={s.checksContainer}>
          <ul className={s.ulBeneficios}>
            <li>
              <img src={check} alt="" />
              <h1 className={s.beneficios}>
                Podras agregar más de una profesión!
              </h1>
            </li>
            <li>
              <img src={check} alt="" />
              <h1 className={s.beneficios}>
                Podras agregar imagenes de tus mejores trabajos realizados!
              </h1>
            </li>
            <li>
              <img src={check} alt="" />
              <h1 className={s.beneficios}>Saldras primero en las busquedas!</h1>
            </li>
            <li>
              <img src={check} alt="" />
              <h1 className={s.beneficios}>
                Tu perfil será destacado en toda la página!
              </h1>
            </li>
          </ul>
        </div>
        {activeUser.isPremium ? (
                  <div className={s.bePremium}>
                  <div className={s.premiumText}>
                    <h1>Plan Premium ACTIVO</h1>
                    <h2 className={s.vence}><img src={calendar} alt=""/>{`Vence el ${activeUser?.expiration_date}`}</h2>
                    <h2 className={s.id}>{`ID de reclamo: `}</h2>
                    <h2 className={s.idP}>{activeUser.preapproval_id}</h2>
                    <h2 className={s.pago}>{`Pago realizado el ${activeUser.payment_date}`}</h2>
                  </div>
    
                  <div className={s.premiumRocketButton} onClick={'handlePremiumModal'}>
                    <div>
                      <img src={activo} alt="Premium Logo"></img>
                    </div>
                  </div>
                </div>
        ) : (
          <>
            <div className={s.bePremium}>
              <div className={s.premiumText}>
                <h1>Plan Premium</h1>
                <h2 className={s.descuento}>Contratalo ahora por tan solo <h3>AR$5000</h3></h2>
                <div className={s.contenedorPrecio}>
                <img src={etiqueta} alt=""/><h2>AR$4000</h2> 
                </div>
                <div className={s.contenedorBotonBuy} onClick={""}>
                    <p>Obtener ahora</p>
                </div>
              </div>

              <div className={s.premiumRocketButton} onClick={'handlePremiumModal'}>
                <div>
                  <img src={rocket} alt="Premium Logo"></img>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );

}


export default Premium