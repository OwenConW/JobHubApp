import React from "react";
import { useSelector } from "react-redux";
import ReviewDashboardCard from './ReviewDashboardCard/ReviewDashboardCard'
import s from './ReviewsAdminPanel.module.scss'

function ReviewsAdminPanel(props) {
  const { reviews } = props;

  const fetchingAdminDeleteReview = useSelector(state => state.fetching.fetchingAdminDeleteReview)
  
  return (
    <div className={s.cardsContainer}>
      {fetchingAdminDeleteReview ? <h1>Eliminando...</h1> : null}
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