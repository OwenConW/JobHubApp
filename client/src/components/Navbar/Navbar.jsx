import React, { useState } from 'react';

//assets
import logo from './assets/logo.svg';
import defaultimage from './assets/deafultimage.png';
import chatlogo from './assets/chat.png';

//auth0
import { useAuth0 } from '@auth0/auth0-react';

//styles and utilities
import s from './Navbar.module.scss';
import { Sling as Hamburger } from 'hamburger-react'
import { Link } from 'react-router-dom';

//UserTest
import login from './assets/Login.png';
import logouticon from './assets/Logout.png';
import { getLocalStorage } from '../../handlers/localStorage';
import Menu from './mobile/Menu';

const Navbar = () => {
	const [openBurger, setOpenBurger] = useState(false);
	const { isAuthenticated, logout } = useAuth0();
	const activeUser = getLocalStorage();

	const handleLogout = () => {
        logout();
        localStorage.clear();
    }

	return (
		<div className={s.container}>
			<div className={s.burgerbtn}>
				<Hamburger toggled={openBurger} toggle={setOpenBurger} duration={0.5} rounded color="#54a7b1"/>
			</div>
			<div className={openBurger ? s.burgerActive :  s.burgerInactive}>
				<Menu isAuthenticated={isAuthenticated} activeUser={activeUser} handleLogout={handleLogout}/>
			</div>
			<div className={s.menu}>
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
				{isAuthenticated && 
				    <Link to="/support" className={s.link}>
				        Support
			        </Link>
				}
				{
					activeUser?.isAdmin ? (
						<Link to="/adminDashboard" className={s.link}>
							Administrador
						</Link>
					) : (
						<></>
					)
				}
			</div>

			<div className={s.logo}>
				<img src={logo} alt="logo" />
			</div>

			<div className={s.profile}>
				{isAuthenticated ? (
					<div className={s.user}>
						<Link to={`/myorders`} className={s.link}>
							Ordenes
						</Link>
						<Link to={`/chat`} className={s.link}>
							<img src={chatlogo} alt="chat" />
						</Link>

						{
							activeUser.isPremium ?
							<Link to={'/profile'} className={s.profileimgPremium}>
							{activeUser.image !== 'noimage' ?  <img src={activeUser.image} alt=""/> : <img src={defaultimage} alt=""/>}
							</Link>
							:
							<Link to={'/profile'} className={s.profileimg}>
							{activeUser.image !== 'noimage' ?  <img src={activeUser.image} alt=""/> : <img src={defaultimage} alt=""/>}
							</Link>
						}

						<div className={s.link} onClick={handleLogout}>
							<img src={logouticon} className={s.logout} alt="logout" />
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
	);
};

export default Navbar;
