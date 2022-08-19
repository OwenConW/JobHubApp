import React from "react";
import s from "./Paginate.module.css";

export default function Paginate({ proffesionalsPerPage, professionalsArray, paginado, currentPage }) {
    const pageNumbers = []
    for(let i = 1; i <= Math.ceil(professionalsArray / proffesionalsPerPage); i ++) {
        pageNumbers.push(i)
    }
    return(
        <nav>
            <ul className={s.ul}>
                {pageNumbers.map(n => (
                    <li className={s.li} key={n}>
                        <button className={n === currentPage ? s.CPbutton : s.button} onClick={() => paginado(n)}>{n}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}