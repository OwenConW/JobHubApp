import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterProfessionals } from '../../redux/userActions'
import SearchBar from './SearchBar/SearchBar';
import Filter from './Filter/Filter';

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
		<div>
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
		</div>
	);
};

export default Catalog;
