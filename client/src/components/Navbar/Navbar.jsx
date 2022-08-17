import React from 'react';

//assets
import logo from './assets/logo.svg';

//styles and utilities
import s from './Navbar.module.scss';
import { Link } from 'react-router-dom';

//UserTest
import userimage from './assets/userimage.jpg';
import login from './assets/login.svg';
const isAutenticated = true;

const Navbar = () => {
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
				{isAutenticated ? (
					<div className={s.user}>
						<Link to="/profile" className={s.link}>
							Mi perfil
						</Link>
						<img src={userimage} alt="user" />
					</div>
				) : (
					<div className={s.user}>
						<Link to="/login" className={s.link}>
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
