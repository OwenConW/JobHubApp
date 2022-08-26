import React from "react";
import ReviewDashboardCard from './ReviewDashboardCard/ReviewDashboardCard'
import s from './ReviewsAdminPanel.module.scss'

function ReviewsAdminPanel(props) {
  const { reviews } = props;
  
  return (
    <div className={s.cardsContainer}>
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