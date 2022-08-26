import React from 'react';
import Navbar from '../Navbar/Navbar';
import s from './Map.module.css';
import preview from './asset/preview.png';

const Map = () => {
	return (
		<>
			<Navbar />
			<div className={s.map}>
			<img
				src={preview}
				alt="mapa"
				className={s.mapa}
			/>
			<p>Característica en desarrollo...</p>
			</div>
		</>
	);
};

export default Map;
