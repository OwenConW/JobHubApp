import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUsersByNameOrJob } from '../../../redux/userActions';
import estilos from './SearchBar.module.scss';

const SearchBar = (props) => {
	const [input, setInput] = useState('');
	const dispatch = useDispatch();

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(getUsersByNameOrJob(input));
		setInput('');
	}

	return (
		<form className={estilos.container} onSubmit={(e) => handleSubmit(e)}>
			<input
				type="text"
				placeholder="Search by job or name..."
				value={input}
				onChange={(e) => setInput(e.target.value)}
				className={estilos.searchInput}
			/>
			<input className={estilos.searchButton} type="submit" value="SEARCH" />
		</form>
	);
};

export default SearchBar;
