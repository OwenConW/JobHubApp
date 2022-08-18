import React, { useState } from 'react';
import estilos from './SearchBar.module.scss';

const SearchBar = (props) => {
	const { addFilterValue, handleReset } = props;

	const [intputValue, setInputValue] = useState('');

	function handleChange(e) {
		e.preventDefault()
		addFilterValue(e.target.name, e.target.value)
		setInputValue(e.target.value)
	}

	function handleClick(){
		handleReset()
		setInputValue('')
	}

	return (
		<section className={`${estilos.searchBar}`}>
				<h3>Nombre</h3>
				<input
					type="text"
					name="name"
					placeholder="Search name..."
					value={intputValue}
					onChange={handleChange}
				/>
				<input 
					type='button' 
					name='reset-btn' 
					onClick={handleClick} 
					value="Mostrar todos"
					className={estilos.showAllBtn} />
		</section>
	);
};

export default SearchBar;
