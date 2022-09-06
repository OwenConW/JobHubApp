import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import s from './MapView.module.scss';
import AllMarkers from './AllMarkers/AllMarkers';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Preview from './preview/Preview';
import defaultimage from '../Navbar/assets/deafultimage.png';

//map
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { oficioStyle } from './AllMarkers/styles';

import { userIcon, userIconP } from './mapIcons';
import { getLocalStorage } from '../../handlers/localStorage';
import { useAuth0 } from '@auth0/auth0-react';

//distances
import pitagorasDistance from '../../handlers/pitagorasDistance';

const MapView = () => {
	const activeUser = getLocalStorage();
	const [distance, setDistance] = useState(1);
	const [users, setUsers] = useState([]);
	const [closeUsers, setCloseUsers] = useState([]);
	const [search, setSearch] = useState({
		value: '',
		searchUsers: []
	});

	const { isAuthenticated } = useAuth0();

	const closeToOne = (coords1, coords2) => {
		if(pitagorasDistance(coords1, coords2) < distance){ //distancia en kilometros
			return true;
		}else{
			return false;
		}
	}

    useEffect(() => {

        const fetchData = async () => {
            let response = await axios.get('/users');
            setUsers([
                ...response.data
            ]);
        }

        fetchData();
    }, []);

	useEffect(() => {
		if(activeUser){
			let aux = users?.filter(user => closeToOne(activeUser?.coordinate, user.coordinate)
			&& activeUser?.id !== user.id);
			setCloseUsers([...aux])}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [users, distance]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSearch({
			...search,
			searchUsers: []
		});
		try{
			let response = await axios.get(`/users?profession=${search.value}`);
			setSearch({
				...search,
				searchUsers: [...response.data]
			});
		}catch(e){
			console.log(e);
		}
	}

	const handleReset = () => {

		setSearch({
			searchUsers: [],
			value: '',
		});
	}

	if(isAuthenticated){
		return (
			<>
			<Navbar />
				<div className={s.container}>
				<div className={s.leftContainer}>
					<div className={s.activeUser}>
						<h3>Mapa</h3>
						<div className={s.user}>
							<div className={activeUser?.isPremium ? s.profileImagePremium : s.profileImage}>
								<img src={activeUser.image === 'noimage' ? defaultimage : activeUser.image} alt="userprofile" />
							</div>
							<div className={s.name}>
								{activeUser?.name} {activeUser?.last_Name}
							</div>
						</div>

						<div className={s.buscador}>
							<form onSubmit={e => handleSubmit(e)} className={s.form}>
								<input type="text" className={s.searchbar} value={search.value} placeholder='Busca una profesión' onChange={(e) => setSearch({
									...search,
									value: e.target.value
								})}/>
								<input type="submit" className={s.submit} value='Buscar' disabled={!search.value}/>
								<input type="button" onClick={handleReset} className={s.reset} value='Cercanos' />
							</form>
						</div>
					</div>
					<div className={s.professionals}>
						{search.searchUsers.length ? (
						<>
						<h3>Busqueda</h3>
						<div className={s.professionalsContainer}>
						{search.searchUsers.map(user => {
							return(
								<Link to={`/details/${user.id}`} className={s.link} key={user.id}>
								<div className={user.isPremium ? s.profileImageP : s.profileImage}>
									<img src={user.image === 'noimage' ? defaultimage : user.image } alt="userprofile" />
								</div>
								<div className={s.name}>
									<h3>{user.name} {user.last_Name}</h3>
									<p>{user?.professions[0]?.name}</p>
									<p>Se encuentra a {Number.parseFloat(pitagorasDistance(activeUser?.coordinate, user.coordinate)).toFixed(2)} km</p>
								</div>
								</Link>
							)
						})}
						</div>
						</>) : (
						<>
						<h3>Profesionales cercanos</h3>
						<div className={s.distances}>
							<select name="distance" onChange={(e) => {
								setDistance(e.target.value);
							}} value={distance}>
								<option value="1">1 Km</option>
								<option value="5">5 Km</option>
								<option value="10">10 Km</option>
								<option value="15">15 Km</option>
							</select>
						</div>
						<div className={s.professionalsContainer}>
						{closeUsers.length ? closeUsers.map(user => {
							return(
								<Link to={`/details/${user.id}`} className={s.link} key={user.id}>
								<div className={user.isPremium ? s.profileImageP : s.profileImage}>
									<img src={user.image === 'noimage' ?  defaultimage : user.image } alt="userprofile" />
								</div>
								<div className={s.name}>
									<h3>{user.name} {user.last_Name}</h3>
									<p>{user.professions[0]?.name}</p>
									<p>Se encuentra a {Number.parseFloat(pitagorasDistance(activeUser?.coordinate, user.coordinate)).toFixed(2)} KM</p>
								</div>
								</Link>
							)
						}) : 'No hay profesionales cercanos a tí.'}
						</div>
						</>
						)}
					</div>
				</div>

				<div className={s.mapContainer}>
					<MapContainer center={[activeUser?.coordinate[0], activeUser?.coordinate[1]]} zoom={15} scrollWheelZoom={true} className={s.map}>
						<TileLayer
								noWrap={true}
								minZoom={3}
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
								url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
						/>

						<Marker position={[activeUser?.coordinate[0], activeUser?.coordinate[1]]} icon={activeUser?.isPremium ? userIconP : userIcon}>
							<Popup className='professional-popup'>
								<p style={oficioStyle}>{activeUser.name}</p>
							</Popup>
						</Marker>

						<AllMarkers/>
						<Circle center={[activeUser?.coordinate[0], activeUser?.coordinate[1]]} pathOptions={activeUser?.isPremium ? {fillColor: 'rgba(241,255,99,0.5144608868938201)', color: '#AB9F3A'} : {fillColor: 'grey', color: '#07393C'}} radius={distance * 1000} />
					</MapContainer>
				</div>
			</div>
			</>
	);
	}else{
		return(
			<>
				<Navbar/>
				<Preview/>
			</>
		)
	}

};

export default MapView;
