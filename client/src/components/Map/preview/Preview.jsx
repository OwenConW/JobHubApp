import React from 'react';
import s from './Preview.module.scss';
import preview from '../asset/preview.png';
import { useNavigate } from 'react-router-dom';

const Preview = () => {
    const navigate = useNavigate();

    return (
        <div className={s.container}>
            <div className={s.preview}>
                <h4>Está caracteristica es solo para usuarios registrados.</h4>
                <div className={s.buttondiv}>
                    <div className={s.button} onClick={() => navigate('/')}>Iniciar sesión</div>
                </div>
            </div>
            <div className={s.bkg}>
                <img src={preview} alt="preview" />
            </div>
        </div>
    )
}

export default Preview