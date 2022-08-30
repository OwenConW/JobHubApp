import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getAllReviewsForAdmin, getReviewByUserIdForAdmin, getReviewByIdForAdmin } from '../../../redux/adminActions'
import ReviewDashboardCard from './ReviewDashboardCard/ReviewDashboardCard'
import s from './ReviewsAdminPanel.module.scss'

function ReviewsAdminPanel(props) {
  const { reviews } = props;
  
  const dispatch = useDispatch()

  const [searchByIdInput, setSearchByIdInput] = useState({review_id: '', review_user_id:''});

  const fetchingAdminDeleteReview = useSelector(state => state.fetching.fetchingAdminDeleteReview)

  function handleSearchReviewByUserIdChange(e) {
    setSearchByIdInput({...searchByIdInput, [e.target.name]: e.target.value})
  }

  function getAllReviews(e){
    dispatch(getAllReviewsForAdmin())
  }

  function handleSearchReviewByUserIdSubmit(e) {
    e.preventDefault();
    if(!searchByIdInput.review_user_id) return
    dispatch(getReviewByUserIdForAdmin(searchByIdInput.review_user_id));
  }

  function handleSearchReviewByIdSubmit(e) {
    e.preventDefault();
    if(!searchByIdInput.review_id) return
    dispatch(getReviewByIdForAdmin(searchByIdInput.review_id));
  }

  return (
    <div className={s.cardsContainer}>
      {fetchingAdminDeleteReview ? <h1>Eliminando...</h1> : null}
      <form onSubmit={handleSearchReviewByIdSubmit}>
        <label htmlFor="review_id">Buscar review por ID</label>
        <input type="text" name="review_id" onChange={handleSearchReviewByUserIdChange} />
        <input type="submit" value="buscar" />
      </form>
      <form onSubmit={handleSearchReviewByUserIdSubmit}>
        <label htmlFor="review_user_id">Buscar review por ID del usuario</label>
        <input type="text" name="review_user_id" onChange={handleSearchReviewByUserIdChange} />
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