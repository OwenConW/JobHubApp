import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getReviewByUserIdForAdmin } from '../../../redux/adminActions'
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

  function handleSearchReviewByUserIdSubmit(e) {
    e.preventDefault()
    if(!searchByIdInput) return
    dispatch(getReviewByUserIdForAdmin(searchByIdInput));
  }

  return (
    <div className={s.cardsContainer}>
      {fetchingAdminDeleteReview ? <h1>Eliminando...</h1> : null}
      <form onSubmit={handleSearchReviewByUserIdSubmit}>
        <label htmlFor="review_id">Buscar review por ID</label>
        <input type="text" name="review_id" onChange={handleSearchReviewByUserIdChange} />
        <input type="submit" value="buscar" />
      </form>
      {
        reviews?.map( r => {
          return (
              <ReviewDashboardCard {...r} />
          )
        })
      }
    </div>
  )
}

export default ReviewsAdminPanel;