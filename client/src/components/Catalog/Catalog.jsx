import React from 'react';
import SearchBar from './SearchBar/SearchBar';
import Filter from './Filter/Filter';

const Catalog = (props) => {

function addFilterValue(targetName, value){
	console.log(targetName,"Value:", value);
}

	return (
		<div>
			CATALOGO
			<SearchBar addFilterValue={addFilterValue} />
			<Filter addFilterValue={addFilterValue} />
		</div>
	);
};

export default Catalog;
