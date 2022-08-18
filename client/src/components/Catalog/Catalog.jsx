import React from 'react';
import SearchBar from './SearchBar/SearchBar';
import estilos from './Catalog.module.scss';
import Card from '../Card/Card';

const Catalog = (props) => {
	return (
		<div className={estilos.container}>
			<aside className={estilos.aside}>
				<div>
					<SearchBar />
				</div>
				<div>FILTROS!!!</div>
			</aside>
			<div className={estilos.professionals}>
				<header className={estilos.header}>
					<span>Catálogo de profesionales</span>
				</header>
				<div className={estilos.cardsContainer}>
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
				</div>
			</div>
		</div>
	);
};

export default Catalog;
