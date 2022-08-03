import estilos from "../../estilos/Paginated/Paginado.module.css"
import { useDispatch } from "react-redux"
import { updatePage } from "../../redux/actions/actions"

export default function Paginado({pagina, setPagina, maximo}){

    const dispatch = useDispatch()

    const nextPage = () => {
        dispatch(updatePage(parseInt(pagina) + 1))
        setPagina(parseInt(pagina) + 1)
    }

    const previusPage = () => {
        dispatch(updatePage(parseInt(pagina) - 1))
        setPagina(parseInt(pagina) - 1)
    }

    return(
        <div className={estilos.ContenedorPaginado}>
            <><button disabled={pagina === 1 || pagina < 1} onClick={previusPage} className={estilos.ButtonL} >{"<"}</button>
            <b className={estilos.text}>{pagina} de {maximo}</b>
            <button disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)} onClick={nextPage} className={estilos.ButtonR}>{">"}</button></>
        </div>
    )
}