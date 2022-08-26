import React from 'react';

//styles and utilities
import s from './Card.module.scss';
import { Link } from 'react-router-dom';
import star from './assets/Star.svg';
import details_interior from './assets/Det_interior.svg';

// const Card = ({ id, name, lastName, city, province, rating, name_job, image }) => {
function Card(props) {
	let { id, name, last_Name, city, country, name_job, image } =
		props.data;

	return (
		<div className={s.card}>
			<div className={s.header}>
				<h3>{name_job}</h3>
				<div className={s.rating}>
					<img src={star} alt="star" />
					{/* <p>{rating}</p> */}
					<p>4.5</p>
				</div>
			</div>

			<div className={s.data}>
				<div className={s.info}>
					<div className={s.user}>
						<div className={s.image}>
							<img src={image} alt="user_profile" />
						</div>
						<div className={s.userinfo}>
							<h3>
								{name} {last_Name}
							</h3>
							<p>
								{city}, {country}
							</p>
						</div>
					</div>
					<div className={s.detail}>
						<Link to={`/details/${id}`} className={s.detailLink}>
						<div className={s.btn}>
							<img src={details_interior} alt="details" />
						</div>
						</Link>
					</div>
				</div>
				<div className={s.top}></div>
				<div className={s.bottom}></div>
			</div>
		</div>
	);
}
export default Card;
