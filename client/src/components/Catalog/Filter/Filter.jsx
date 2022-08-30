import React, { useEffect } from "react";
import s from './Filter.module.scss';

import { useDispatch, useSelector } from "react-redux";
import { actionGetAllJobs } from "../../../redux/jobActions"

function Filter(props) {
	const { addFilterValue } = props;

	function handleClick(e) {
		addFilterValue(e.target.name, e.target.value);
	}

  const dispatch = useDispatch();
  const professions = useSelector(state => state.jobs.jobs)
useEffect(() => {
  dispatch(actionGetAllJobs())
},[dispatch])

  return (
    <div className={s.filterContainer}>
      <div className={s.allButtonsContainer}>
        <div className={s.professionsButtonsContainer}>
          <button key={0} type="button" onClick={handleClick} name="profession" value="">Todas las profesiones</button>
          {professions?.map(profession => {
            return (
              <button key={profession.id}
                      type="button"
                      onClick={handleClick}
                      name="profession"
                      value={profession.name}
                      > {profession.name} </button>
                  )
          })}
        </div>
        <button className={s.ratingBtn} type="button" value="ASC" name="rating" onClick={handleClick}>Rating ↑</button>
      </div>
    </div>
  )
}


export default Filter;