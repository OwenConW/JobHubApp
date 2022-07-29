import estilos from "../../estilos/Paginated/Paginado.module.css"
export default function Paginado({pagina, setPagina, maximo}){

    const nextPage = () => {
        setPagina(parseInt(pagina) + 1)
    }

    const previusPage = () => {
        setPagina(parseInt(pagina) - 1)
    }

    return(
        <div className={estilos.ContenedorPaginado}>
            { <><button disabled={pagina === 1 || pagina < 1} onClick={previusPage} className={estilos.ButtonL} >{"<"}</button>
            <b className={estilos.text}>{pagina} de {maximo}</b>
            <button disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)} onClick={nextPage} className={estilos.ButtonR}>{">"}</button></>}
        </div>
    )
}