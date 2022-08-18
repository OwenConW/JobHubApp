import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterProfessionals } from '../../redux/userActions'
import SearchBar from './SearchBar/SearchBar';
import Filter from './Filter/Filter';
import estilos from './Catalog.module.scss';
import Card from '../Card/Card';
import Navbar from "../Navbar/Navbar";



const Catalog = (props) => {

const [filters, setFilters] = useState({name:"", profession:"all-professions", rating:""}) 

const dispatch = useDispatch()

function addFilterValue(targetName, value){
	setFilters(prevState => ({
		...prevState,
		[targetName]: value
	}))
}

function handleSubmit(e){
	e.preventDefault()
	dispatch(filterProfessionals({...filters}))
}

	return (
		<>
        	<Navbar />
			<div className={estilos.container}>
				<aside className={estilos.aside}>
					<form onSubmit={handleSubmit}>
						CATALOGO
						<SearchBar addFilterValue={addFilterValue} />
						<Filter addFilterValue={addFilterValue} />
						<input
							//className={`${estilos.inButton}`}
							type="submit"
							value="SEARCH"
						/>
					</form>
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
		</>
	);
};

export default Catalog;
