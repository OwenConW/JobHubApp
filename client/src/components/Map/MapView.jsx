import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import s from './MapView.module.scss';
import AllMarkers from './AllMarkers/AllMarkers';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

//map
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { oficioStyle } from './AllMarkers/styles';

import { userIcon } from './mapIcons';
import { getLocalStorage } from '../../handlers/localStorage';
import { useAuth0 } from '@auth0/auth0-react';

//distances
import pitagorasDistance from '../../handlers/pitagorasDistance';

const MapView = () => {
	const activeUser = getLocalStorage();
	const [distance, setDistance] = useState(1);
	const [users, setUsers] = useState([]);
	const [closeUsers, setCloseUsers] = useState([]);
	const { isAuthenticated } = useAuth0();
	const navigate = useNavigate();

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

			let aux = users.filter(user => closeToOne(activeUser.coordinate, user.coordinate));
			setCloseUsers([...aux]);

	}, [users, distance]);

	return (
			isAuthenticated ? (<>
			<Navbar />
			<div className={s.container}>
				<div className={s.leftContainer}>
					<div className={s.activeUser}>
						<h3>Mapa</h3>
						<div className={s.user}>
							<div className={s.profileImage}>
								<img src={activeUser.image} alt="userprofile" />
							</div>
							<div className={s.name}>
								{activeUser.name} {activeUser.last_Name}
							</div>
						</div>

						<div className={s.buscador}>
							<input type="text" className={s.searchbar} placeholder='Busca algún profesional...'/>
						</div>

					</div>
					<div className={s.professionals}>
						<h3>Profesionales cercanos</h3>
						<div className={s.distances}>
							<select name="distance" onChange={(e) => {
								setDistance(e.target.value);
							}}>
								<option value="1">1 Km</option>
								<option value="5">5 Km</option>
								<option value="10">10 Km</option>
								<option value="15">15 Km</option>
							</select>
						</div>
						{closeUsers.length ? closeUsers.map(user => {
							return(
								<Link to={`/details/${user.id}`} className={s.link} key={user.id}>
								<div className={s.profileImage}>
									<img src={user.image} alt="userprofile" />
								</div>
								<div className={s.name}>
									<h3>{user.name} {user.last_Name}</h3>
									<p>{user.professions[0].name}</p>
									<p>Se encuentra a {Number.parseFloat(pitagorasDistance(activeUser.coordinate, user.coordinate)).toFixed(2)} KM</p>
								</div>
								</Link>
							)
						}) : 'No hay profesionales cercanos a tí.'}
					</div>
				</div>

				<div className={s.mapContainer}>
					<MapContainer center={[activeUser.coordinate[0], activeUser.coordinate[1]]} zoom={16} scrollWheelZoom={true} className={s.map}>
						<TileLayer
								noWrap={true}
								minZoom={3}
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
								url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
						/>

						<Marker position={[activeUser.coordinate[0], activeUser.coordinate[1]]} icon={userIcon}>
							<Popup className='professional-popup'>
								<p style={oficioStyle}>{activeUser.name}</p>
							</Popup>
						</Marker>

						<AllMarkers/>
						<Circle center={[activeUser.coordinate[0], activeUser.coordinate[1]]} pathOptions={{fillColor: 'grey', color: '#07393C'}} radius={distance * 1000} />
					</MapContainer>
				</div>
			</div>
			</>) : navigate('../')
	);
};

export default MapView;
