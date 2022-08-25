import React from 'react';

//assets
import logo from './assets/logo.svg';
import defaultimage from './assets/deafultimage.png';

//auth0
import { useAuth0 } from '@auth0/auth0-react';

//styles and utilities
import s from './Navbar.module.scss';
import { Link } from 'react-router-dom';

//UserTest
import login from './assets/login.svg';
import { getLocalStorage } from '../../handlers/localStorage';

const Navbar = () => {
	const { isAuthenticated, logout } = useAuth0();
	const activeUser = getLocalStorage();

	return (
		<div className={s.container}>
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
			</div>

			<div className={s.logo}>
				<img src={logo} alt="logo" />
			</div>

			<div className={s.profile}>
				{isAuthenticated ? (
					<div className={s.user}>
						<div className={s.link}>
							<Link to={`/chat`}>
								MD
							</Link>
						</div>
						<div className={s.link} onClick={() => logout()}>
							Logout
						</div>
						<Link to={'/profile'} className={s.profileimg}>
							{activeUser.image ? <img src={activeUser.image}/> : <img src={defaultimage}/>}
						</Link>
					</div>
				) : (
					<div className={s.user}>
						<Link to="/" className={s.link}>
							Iniciar sesión
						</Link>
						<img src={login} alt="login" />
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
