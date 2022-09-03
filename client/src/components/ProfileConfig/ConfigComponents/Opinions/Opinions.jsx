import React from "react";
import s from './Opinions.module.scss'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorage } from "../../../../handlers/localStorage";
import { getChars, getCharsById } from "../../../../redux/userActions";
import OpinionCard from "./OpinionCard/OpinionCard";
import { useState } from "react";

const Opinions = () => {
  const dispatch = useDispatch()
  let activeUser = getLocalStorage()

  // let allReviews = [{ id_orders: 7, id_user_client: 1, id_professional: 3, feedback_client: 'Buenardo el trabajo', rating: 3 }, { id_orders: 8, id_user_client: 1, id_professional: 2, feedback_client: 'Un asco', rating: 1 }, { id_orders: 9, id_user_client: 1, id_professional: 3, feedback_client: 'Buenardo el trabajo', rating: 3 }, { id_orders: 10, id_user_client: 1, id_professional: 3, feedback_client: 'Buenardo el trabajo', rating: 3 }]

  let users = useSelector((state) => state.users.users)
  // let allReviews = useSelector((state) => state.reviews.reviews)
  let saveAllReviews = useSelector((state) => state.reviews.reviews)
  let myReviews = saveAllReviews?.filter(review => review?.id_user_client === activeUser.id)
  useEffect(() => {

  }, [users])

  const [ allReviews, setAllReviews ] = useState(myReviews)

//FILTRADO POR NOMBRE
  const [filter, setFilter] = useState('')

  const filterByName = (filter) => {
    let filteredProfessionals;
    let filteredReviews = allReviews
  
    if (filter) {
      filteredReviews = []
      filteredProfessionals = users.filter(prof => prof.name.toLowerCase().includes(filter.toLowerCase()) || prof.last_Name.toLowerCase().includes(filter.toLowerCase()))
      for (let x = 0; x < filteredProfessionals.length; x++) {
        let filteredProfessional = filteredProfessionals[x];
        let reviewsForFilteredProfessional = myReviews.filter(review => review.id_user_professional == filteredProfessional.id);
        reviewsForFilteredProfessional.forEach(review => filteredReviews.push(review))
      }
      setAllReviews(filteredReviews)
    } else {
      setAllReviews(myReviews)
    }
  }

  const onFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    filterByName(filter)
  }, [filter])


  return (
    <div className={s.container}>
      
      <input name="filter" value={filter} placeholder="Busqueda por nombre..." className={s.filter} onChange={event => onFilterChange(event)}></input>
      {
        allReviews.length ? allReviews.map(review =>
          <OpinionCard review={review} users={users} key={review?.id}/>

        ) : <p className={s.voidOpinions}>No se encontraron reseñas</p>
      }

    </div>
  )
}

export default Opinions