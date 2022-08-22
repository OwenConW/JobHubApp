import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterProfessionals, getChars } from '../../redux/userActions';
import SearchBar from './SearchBar/SearchBar';
import Filter from './Filter/Filter';
import estilos from './Catalog.module.scss';
import Card from '../Card/Card';
import Navbar from '../Navbar/Navbar';

import Paginate from "../Paginate/Paginate";
import { getChars } from '../../redux/userActions';


const Catalog = (props) => {
	let professionalsArray = useSelector(
		(state) => state.users.filteredProfessionals
	);
	const [currentPage, setCurrentPage] = useState(1) 
  const [proffesionalsPerPage, setProffesionalsPerPage] = useState(10)  
  const iOfLastProffesional = currentPage * proffesionalsPerPage
  const iOfFirstProffesional = iOfLastProffesional - proffesionalsPerPage
  const currentProffesionals = professionalsArray.slice(iOfFirstProffesional, iOfLastProffesional)
	const paginado = (pageNumber) => {  setCurrentPage(pageNumber) }

	const [filters, setFilters] = useState({name:"", profession:"", rating:""}) 
	const [nameInputValue, setNameInputValue] = useState('')


	const dispatch = useDispatch();

	function addFilterValue(targetName, value) {

		if (targetName === "name") {
			setNameInputValue(value)
		}

		if (targetName === 'rating' && filters.rating === 'ASC') {
			setFilters((prevState) => ({
				...prevState,
				[targetName]: '',
			}));
			return;
		}

		setFilters(prevState => ({
			...prevState,
			[targetName]: value,
		}));
	}

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(filterProfessionals({ ...filters }));
		e.target.reset();
		setCurrentPage(1);
	}

	function handleShowAll() {
		dispatch(getChars());
		setCurrentPage(1);
	}

useEffect(() => {
 console.log(professionalsArray);
}, [professionalsArray])

useEffect(() => {
	dispatch(getChars());
	// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


function handleReset() {
	setFilters({name:"", profession:"", rating:""})
	dispatch(getChars());
	setNameInputValue('')
}

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
					<div className={estilos.paginate}>
                        <Paginate 
                            key = {1}
                            proffesionalsPerPage={proffesionalsPerPage}
                            professionalsArray={professionalsArray.length}   
                            paginado={paginado}
                            currentPage={currentPage}
                        />
                    </div>
					<div className={estilos.cardsContainer}>
						{professionalsArray.length > 0 ? currentProffesionals.map((p, i) => {
							return (
								<Card
									key={i}
									data={{
										...p,
									    image: 'https://api.time.com/wp-content/uploads/2017/12/terry-crews-person-of-year-2017-time-magazine-2.jpg', //modificar cuando este en la DB!!
								    }}
							    />
							)
						}) : 
							<div className={estilos.notFind}>
								-- NO ENCONTRAMOS PROFESIONALES QUE SE AJUSTEN A TU BUSQUEDA --
							</div>
						}
					</div>
				</div>
			</div>
		</>
	);
};

export default Catalog;
