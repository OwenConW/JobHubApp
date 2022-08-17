import React from 'react';
import SearchBar from './SearchBar/SearchBar';
import estilos from './Catalog.module.scss';

const Catalog = (props) => {
	return (
		<div className={estilos.container}>
			<aside className={estilos.aside}>
				<div>
					<SearchBar />
				</div>
				<div>FILTROS!!!</div>
			</aside>
			<div>
				<header className={estilos.header}>
					<span>Catálogo de profesionales</span>
				</header>
				<div className={estilos.cardsContainer}>
					<div>CARDS</div>
					<div>CARDS</div>
					<div>CARDS</div>
					<div>CARDS</div>
					<div>CARDS</div>
					<div>CARDS</div>
				</div>
			</div>
		</div>
	);
};

export default Catalog;
