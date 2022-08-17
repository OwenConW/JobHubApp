import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUsersByNameOrJob } from '../../redux/userSlice';
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
		<section className={`${estilos.searchBar}`}>
			<form onSubmit={(e) => handleSubmit(e)}>
				<input
					type="text"
					placeholder="Search by job or name..."
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<input
					className={`${estilos.inButton}`}
					type="submit"
					value="SEARCH"
				/>
			</form>
		</section>
	);
};

export default SearchBar;
