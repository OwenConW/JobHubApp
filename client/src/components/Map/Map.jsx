import React from 'react';
import estilos from './Map.module.css';

const Map = () => {
	return (
		<>
			<img
				src="https://www.comunidadbaratz.com/wp-content/uploads/El-International-Council-on-Archives-ha-creado-un-mapa-digital-geolocalizando-Archivos.jpg"
				alt="mapa"
				className={estilos.mapa}
			/>
		</>
	);
};

export default Map;
