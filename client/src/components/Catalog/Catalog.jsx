import React, { useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import Filter from './Filter/Filter';
import { useEffect } from 'react';

const Catalog = (props) => {

const [filters, setFilters] = useState() 

function addFilterValue(targetName, value){
	console.log('targetName:',targetName,"| Value:", value);
	setFilters(prevState => ({
		...prevState,
		[targetName]: value
	}))
}

useEffect(() => {
	console.log(filters);
}, [filters])

	return (
		<div>
			CATALOGO
			<SearchBar addFilterValue={addFilterValue} />
			<Filter addFilterValue={addFilterValue} />
		</div>
	);
};

export default Catalog;
