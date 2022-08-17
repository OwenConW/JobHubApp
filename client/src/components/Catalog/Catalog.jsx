import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import Filter from './Filter/Filter';

const Catalog = (props) => {

const [filters, setFilters] = useState() 

function addFilterValue(targetName, value){
	setFilters(prevState => ({
		...prevState,
		[targetName]: value
	}))
}

function handleSubmit(e){
	
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
