import React, { useEffect }  from "react";
import { useDispatch, useSelector } from "react-redux";
import ReviewDashboardCard from './ReviewDashboardCard/ReviewDashboardCard'
import s from './ReviewsAdminPanel.module.scss'

function ReviewsAdminPanel(props) {
  const { reviews } = props;
  const dispatch = useDispatch()

  useEffect(() => {
    
  }, [dispatch])

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