import React from 'react';
import s from './Menu.module.scss';
import {Link} from 'react-router-dom';
import defaultimage from '../assets/deafultimage.png';
import login from '../assets/Login.png';
import chatlogo from '../assets/chat.png';

const Menu = ({activeUser, isAuthenticated, handleLogout}) => {
  return (
    <div className={s.container}>
      <div className={s.routes}>
      <Link to="/home" className={s.link}>
					Inicio
				</Link>
				<Link to="/map" className={s.link}>
					Mapa
				</Link>
				<Link to="/professionals" className={s.link}>
					Catálogo
				</Link>
				<Link to="/faq" className={s.link}>
					Faq
				</Link>
      </div>
      <div className={s.profileUser}>
      {isAuthenticated ? (
					<div className={s.user}>
            <div className={s.profile}>
            {
							activeUser.isPremium ?
							<Link to={'/profile'} className={s.profileimgPremium}>
							{activeUser.image ?  <img src={activeUser.image} alt=""/> : <img src={defaultimage} alt=""/>}
							</Link>
							:
							<Link to={'/profile'} className={s.profileimg}>
							{activeUser.image ?  <img src={activeUser.image} alt=""/> : <img src={defaultimage} alt=""/>}
							</Link>
						}
						<Link to={`/myorders`} className={s.link}>
							Ordenes
						</Link>
						<Link to={`/chat`} className={s.link}>
							<img src={chatlogo} alt="chat" />
						</Link>
            </div>

						<div className={s.link} onClick={handleLogout}>
							Cerrar sesión
						</div>
					</div>
				) : (
					<div className={s.nouser}>
						<Link to="/" className={s.link}>
							Iniciar sesión
							<img src={login} className={s.login} alt="login" />
						</Link>
					</div>
				)}
      </div>
    </div>
  )
}

export default Menu;