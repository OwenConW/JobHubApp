import React, { useState } from 'react'
import DeleteModal from './DeleteModal/DeleteModal';
import s from './Profession.module.scss'

export default function Profession(props) {
  const { name, id } = props

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  function handleOpenDeleteModal(e){
    setOpenDeleteModal(!openDeleteModal)
  }

  return (
    <div>
      {openDeleteModal ? <DeleteModal name={name} id={id} handleOpenDeleteModal={handleOpenDeleteModal}/> : null}
      <button className={s.professionBtn} onClick={handleOpenDeleteModal}>{name}</button>
    </div>
  )
}
