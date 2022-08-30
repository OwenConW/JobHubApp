import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getAllReviewsForAdmin, getReviewByUserIdForAdmin } from '../../../redux/adminActions'
import ReviewDashboardCard from './ReviewDashboardCard/ReviewDashboardCard'
import s from './ReviewsAdminPanel.module.scss'

function ReviewsAdminPanel(props) {
  const { reviews } = props;
  
  const dispatch = useDispatch()

  const [searchByIdInput, setSearchByIdInput] = useState('');

  const fetchingAdminDeleteReview = useSelector(state => state.fetching.fetchingAdminDeleteReview)

  function handleSearchReviewByUserIdChange(e) {
    setSearchByIdInput(e.target.value)
  }

  function getAllReviews(e){
    dispatch(getAllReviewsForAdmin())
  }

  function handleSearchReviewByUserIdSubmit(e) {
    e.preventDefault()
    if(!searchByIdInput) return
    dispatch(getReviewByUserIdForAdmin(searchByIdInput));
  }

  console.log(reviews);

  return (
    <div className={s.cardsContainer}>
      {fetchingAdminDeleteReview ? <h1>Eliminando...</h1> : null}
      <form onSubmit={handleSearchReviewByUserIdSubmit}>
        <label htmlFor="review_id">Buscar review por ID</label>
        <input type="text" name="review_id" onChange={handleSearchReviewByUserIdChange} />
        <input type="submit" value="buscar" />
      </form>

      <button onClick={getAllReviews}>Traer todas las reseñas</button>

      {
        reviews.length !== 0 ? 
        <div className={s.cardsContainer}>  
              { reviews.length && reviews?.map( r => {
                return(
                  <ReviewDashboardCard key={r.id} {...r} />
                )
              })}
      </div> :
      <h1>El usuario no existe o no tiene reseñas</h1>
      }
    </div>
  )
}

export default ReviewsAdminPanel;