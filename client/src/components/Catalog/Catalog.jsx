import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterProfessionals } from '../../redux/userActions'
import SearchBar from './SearchBar/SearchBar';
import Filter from './Filter/Filter';
import estilos from './Catalog.module.scss';
import Card from '../Card/Card';
import Navbar from "../Navbar/Navbar";



const Catalog = (props) => {

const [filters, setFilters] = useState({name:"", profession:"", rating:""}) 
const [nameInputValue, setNameInputValue] = useState('')

const dispatch = useDispatch()

function addFilterValue(targetName, value){
	
	if (targetName === "name") {
		setNameInputValue(value)
	}

	if (targetName === "rating" && filters.rating === "ASC") {
		setFilters(prevState => ({
			...prevState,
			[targetName]: ""
		}))
		return
	}

	setFilters(prevState => ({
		...prevState,
		[targetName]: value
	}))
}

function handleReset() {
	setFilters({name:"", profession:"", rating:""})
	setNameInputValue('')
}

function handleSubmit(e){
	e.preventDefault()
	dispatch(filterProfessionals({...filters}))
	setNameInputValue('')
	e.target.reset()
}

useEffect(() => {
	console.log(filters);
}, [filters])

	return (
		<>
        	<Navbar />
			<div className={estilos.container}>
				<aside className={estilos.aside}>
					<form onSubmit={handleSubmit} className={estilos.filtersFormMainContainer}>
						<h1>FILTRAR</h1>
						<SearchBar addFilterValue={addFilterValue} handleReset={handleReset} valueState={nameInputValue}/>
						<Filter addFilterValue={addFilterValue} />
						<input
							className={`${estilos.searchButton}`}
							type="submit"
							value="SEARCH"
						/>
						<input 
						type='button' 
						name='reset-btn' 
						value="Mostrar todos"
						onClick={handleReset}
						className={estilos.showAllBtn} />
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
