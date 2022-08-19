import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

//auth0
import { useAuth0 } from '@auth0/auth0-react';

//redux
import { setActive } from '../../redux/userActions';
import { useDispatch } from 'react-redux';

//style and utilities
import s from './Login.module.scss';
import logo from './assets/logo.svg';
import background from './assets/background.svg';
import axios from 'axios';

const Login = () => {

	const dispatch = useDispatch();
	const {user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
	const navigate = useNavigate();

	const handleValidate = async (user, validate) => {
		console.log(user);
		try{
			if(validate && user){
				let response = await axios.get(`/verify?mail=${user.email}`);
				if(response.data.onboarding){
					dispatch(setActive(response.data));
					navigate("../home", { replace: true });

				}else{
					navigate("../verify", { replace: true });
				}
			}
		}catch(e){
			return e.message;
		}
	}

	handleValidate(user, isAuthenticated);

	return (
		<div className={s.container}>

			{isLoading ? 'Loading' : (
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
