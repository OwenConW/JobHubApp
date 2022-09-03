import React, { useEffect } from 'react'
import s from './OrdersDeleteModal.module.scss'
import { useSelector, useDispatch} from 'react-redux';
import { deleteOrder } from '../../../../../redux/adminActions';

export default function OrdersDeleteModal(props) {
  const { id, handleDeleteOpenModal } = props;

  const fetchingAdminDeleteOrderSuccess = useSelector(state => state.fetching.fetchingAdminDeleteOrderSuccess)
  const dispatch = useDispatch();

  function handleDelete(e){
    if (e.target.name === 'cancel-btn') return handleDeleteOpenModal()
    dispatch(deleteOrder(id))
  }

  useEffect(() => {
    if(fetchingAdminDeleteOrderSuccess) {
      handleDeleteOpenModal();
    }
  }, [fetchingAdminDeleteOrderSuccess])
  
 return (
    <div className={s.container}>
      <div className={s.infoContainer}>
        <h1>Estas seguro que deseas eliminar la orden?</h1>
        <div className={s.btnContainer}>
          <button className={s.deleteBtn} type="button" onClick={handleDelete}>Eliminar</button>
          <button className={s.cancelBtn} type="button" name="cancel-btn" onClick={handleDelete}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
