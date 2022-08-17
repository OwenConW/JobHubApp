import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUsersByNameOrJob } from '../../../redux/userActions';
import estilos from './SearchBar.module.scss';

const SearchBar = (props) => {
	const { addFilterValue } = props;
	const dispatch = useDispatch();

	function handleChange(e) {
		e.preventDefault()
		addFilterValue(e.target.name, e.target.value)
	}

	return (
		<section className={`${estilos.searchBar}`}>
				<input
					type="text"
					name="profession-name"
					placeholder="Search by job or name..."
					onChange={handleChange}
				/>
		</section>
	);
};

export default SearchBar;
