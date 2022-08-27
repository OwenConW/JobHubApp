import React from "react";
import OrdersDashboardCard from "./OrdersDashboardCard/OrdersDashboardCard"
import s from './OrdersAdminPanel.module.scss'

function OrdersAdminPanel(props) {
  const { orders } = props;
  
  return (
    <div className={s.cardsContainer}>
      {
        orders?.map( r => {
          return (
              <OrdersDashboardCard {...r} />
          )
        })
      }
    </div>
  )
}

export default OrdersAdminPanel;