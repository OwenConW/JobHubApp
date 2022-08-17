import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { filterProfessionals } from '../../redux/userActions'
import SearchBar from './SearchBar/SearchBar';
import Filter from './Filter/Filter';

const Catalog = (props) => {

const [filters, setFilters] = useState() 

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

useEffect(() => {
	console.log(filters);
}, [filters])

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
