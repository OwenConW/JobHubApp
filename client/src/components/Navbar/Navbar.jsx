import React from 'react';

//assets
import logo from './assets/logo.svg';

//auth0
import { useAuth0 } from '@auth0/auth0-react';

//styles and utilities
import s from './Navbar.module.scss';
import { Link } from 'react-router-dom';

//UserTest
import userimage from './assets/userimage.jpg';
import login from './assets/login.svg';

const Navbar = () => {
	const { isAuthenticated, logout } = useAuth0();

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
						<div className={s.link} onClick={() => logout()}>
							Logout
						</div>
						<Link to={'/profile'} className={s.profileimg}>
							<img src={userimage}/>
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
