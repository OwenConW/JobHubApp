import React from 'react';
import Navbar from '../Navbar/Navbar';
import estilos from './Map.module.css';

const Map = () => {
	return (
		<>
			<Navbar />
			<img
				src="https://www.comunidadbaratz.com/wp-content/uploads/El-International-Council-on-Archives-ha-creado-un-mapa-digital-geolocalizando-Archivos.jpg"
				alt="mapa"
				className={estilos.mapa}
			/>
		</>
	);
};

export default Map;
