import React from 'react';
import axios from 'axios';

//assets
import logo from './assets/logo.svg';

//auth0
import { useAuth0 } from '@auth0/auth0-react';

//redux
import { useSelector } from 'react-redux';

//styles and utilities
import s from './Navbar.module.scss';
import { Link } from 'react-router-dom';

//UserTest
import userimage from './assets/userimage.jpg';
import login from './assets/login.svg';

const Navbar = () => {
	const { isAuthenticated, user } = useAuth0();

	const activeUser = useSelector(store => store.users.activeUser);


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
						<Link to="/profile" className={s.link}>
							{user.given_name}
						</Link>
						<img src={userimage}/>
					</div>
				) : (
					<div className={s.user}>
						<Link to="/" className={s.link}>
							Iniciar Sesión
						</Link>
						<img src={login} alt="login" />
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
