import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterProfessionals, getChars } from '../../redux/userActions';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SearchBar from './SearchBar/SearchBar';
import Filter from './Filter/Filter';
import estilos from './Catalog.module.scss';
import Card from '../Card/Card';
import Navbar from '../Navbar/Navbar';
import SliderComponent from './slider/Slider';

const theme = createTheme({
	palette: {
	    primary: {
	    	main: '#00695f',
	    },
	},
	// components: {
	// 	Pagination: {
	// 	  styleOverrides: {
	// 		root: {
	// 		  fontSize: '2rem',
	// 		},
	// 	  },
	// 	},
	// },
});

const Catalog = (props) => {
	let professionalsArray = useSelector(
		(state) => state.users.filteredProfessionals
	);
	const [asideActive, setAsideActive] = useState(false);
    const [activePages, setActivePages] = useState(0)
	const [currentPage, setCurrentPage] = useState(1)
    const iOfLastProfessional = currentPage * 6
    const iOfFirstProfessional = iOfLastProfessional - 6
    const currentProffesionals = professionalsArray.slice(iOfFirstProfessional, iOfLastProfessional)
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
			[targetName]: value
		}))
    }


	const setPages = () => {
		let pages = Math.ceil(professionalsArray.length / 6);
		return parseInt(pages);
	}

    useEffect(() => {
	    dispatch(getChars());
		setActivePages(setPages);
	    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

	useEffect(() => {
		setActivePages(setPages);
	    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [professionalsArray]);

    function handleReset() {
	    setFilters({name:"", profession:"", rating:""})
	    dispatch(getChars())
		setActivePages(setPages)
		setCurrentPage(1)
		setAsideActive(false);
	    setNameInputValue('')
    }

    function handleSubmit(e){
	    e.preventDefault()
	    dispatch(filterProfessionals({...filters}))
	    setActivePages(setPages)
		setCurrentPage(1)
		setAsideActive(false);
	    e.target.reset()
    }

	const handleChange = (e, page) => {
		setCurrentPage(page)
	}

	console.log(activePages);
	return (
		<>
			<Navbar />
			<div className={estilos.container}>
				<aside className={asideActive ? estilos.aside : estilos.asideInactive}>
						{asideActive ? <h2 onClick={() => {
							asideActive ? setAsideActive(false) : setAsideActive(true);
						}}>x</h2> : ''}
						<form onSubmit={handleSubmit} className={estilos.filtersFormMainContainer}>
							<h1>Filtrar</h1>
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
					<div className={estilos.slider}>
						<SliderComponent />
					</div>
					<div className={estilos.paginate}>
						<h3 className={asideActive ? estilos.activefilter : ''} onClick={() => {
							asideActive ? setAsideActive(false) : setAsideActive(true);
						}}>Filtros</h3>
					    <ThemeProvider theme={theme}>
                            <Pagination 
							    count={activePages} 
								page={currentPage} 
								size="large" 
								variant="outlined" 
								shape="rounded" 
								color= "primary" 
								onChange={handleChange}
							/>
						</ThemeProvider>
					</div>
					<div className={estilos.cardsContainer}>
						{professionalsArray && professionalsArray.length ? (
							currentProffesionals.map((p, i) => (
								<Card
									key={i}
									data={{
										...p
									}}
								/>
							))
						) : (
							<div className={estilos.notFind}>
								-- NO ENCONTRAMOS PROFESIONALES QUE SE AJUSTEN A TU BUSQUEDA --
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Catalog;
