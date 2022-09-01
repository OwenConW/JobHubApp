import React, { useState } from 'react'
import DeleteModal from './DeleteModal/DeleteModal';

export default function Profession(props) {
  const { name, id } = props

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  function handleOpenDeleteModal(e){
    setOpenDeleteModal(!openDeleteModal)
  }

  return (
    <div>
      {openDeleteModal ? <DeleteModal name={name} id={id} handleOpenDeleteModal={handleOpenDeleteModal}/> : null}
      <button onClick={handleOpenDeleteModal}>{name}</button>
    </div>
  )
}
