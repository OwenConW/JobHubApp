import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

//localStorage
import { setUserLocalStorage } from '../../handlers/localStorage';

//auth0
import { useAuth0 } from '@auth0/auth0-react';

//style and utilities
import s from './Login.module.scss';
import logo from './assets/logo.svg';
import background from './assets/background.svg';
import axios from 'axios';
import Loader from './Loader/Loader';


const Login = () => {

	const {user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
	const navigate = useNavigate();

console.log('ESTE OBJETO ES LO QUE LLEGA COMO USERS DE GOOGLE',user.picture)
//family_name, given_name, picture
	const handleValidate = async (user, validate) => {
		try{
			if(validate && user){
				let response = await axios.get(`/verify?mail=${user.email}`);
				if(!response.data.onboarding){
					if(response.data.user.isActive === true){
						setUserLocalStorage(response.data.user);
						navigate("../home", { replace: true });
					}else{
						setUserLocalStorage(response.data.user.mail)
						navigate("../returnUser", { replace: true })
					}

				}else{
					setUserLocalStorage({mail: user.email, name: user.given_name, last_name: user.family_name, image: user.picture});
					navigate("../onboarding", { replace: true });
				}
			}
		}catch(e){
			return e.message;
		}
	}


	handleValidate(user, isAuthenticated);

	return (
		<div className={s.container}>

			{isLoading ? <Loader /> : (
			<>
			<div className={s.login}>
				<div className={s.logo}>
					<img src={logo} alt="logo" />
				</div>
				<div className={s.login_btn} onClick={() =>loginWithRedirect()}>
					<p>Iniciar Sesión</p>
				</div>


				<div className={s.invite}>
					<Link to="/home" className={s.link}>
						<p>Continuar como invitado</p>
					</Link>
				</div>

				<div className={s.ayuda}>
					<Link to="/faq" className={s.link}>
						<p>¿Necesitás Ayuda?</p>
					</Link>
				</div>
			</div>
			<div className={s.description}>
				<div className={s.text}>
					<h4>Estás buscando un profesional para tu hogar?</h4>
					<p>
						Encuentra aquí alguien capacitado para el trabajo que
						necesites realizar.
					</p>
					<br />
					<p>
						Puedes ver nuestro cátalogo o utilizar el mapa, para encontrar
						profesionales cerca tuyo.
					</p>
				</div>

				<img src={background} alt="backg" />
			</div>
			</>)}

		</div>
	);
};

export default Login;
