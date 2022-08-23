import React from 'react';
import Navbar from '../Navbar/Navbar';
import s from './MapView.module.scss';
import AllMarkers from './AllMarkers/AllMarkers';

//map
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { userIcon, markerIcon } from './mapIcons';

const MapView = () => {

	return (
		<>
			<Navbar />
			<div className={s.container}>
				<MapContainer center={[-31.3882049386124, -64.18270802753337]} zoom={15} scrollWheelZoom={true} className={s.map}>
					<TileLayer
							noWrap={true}
						    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
							url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
					/>

					<AllMarkers/>

					<Marker position={[-31.3882049386124, -64.18270802753337]} icon={userIcon}>
						<Popup>
							<p>Usted está aquí</p>
						</Popup>
					</Marker>

				</MapContainer>
			</div>
		</>
	);
};

export default MapView;
