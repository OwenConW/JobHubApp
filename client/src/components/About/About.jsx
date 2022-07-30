import React from "react"
import estilos from "../../estilos/About/About.module.css"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getTypes } from "../../redux/actions/actions.js"
import hacker from "../../estilos/Images/hacker.png"
import linkedin from "../../estilos/Images/linkedin.png"
import gmail from "../../estilos/Images/gmail.png"



export function About(){

    const dispatch = useDispatch()


    const handleClickBack = () => {
        dispatch(getTypes())
    }



    return(
        <div className={estilos.Contenedor1}>
        <Link to={"/home"} className={estilos.Link}><button onClick={handleClickBack} className={estilos.BackButton}>GO HOME</button></Link>
        <div className={estilos.container}>
        <div className={estilos.window}>  
        <div className={estilos.barraWindow}>    
        <button className={estilos.red}></button>
        <button className={estilos.yellow}></button>
        <button className={estilos.green}></button>
        <b className={estilos.NameBash}>{"$ owen - bash - about"}</b>
        </div> 
        <div className={estilos.contenedorBash}>
        <div className={estilos.ContenedorScrips}>
        <b>{`┌──(0w3n㉿kali)-[~]`}</b>
        <b>{`└─$ npm help `}</b>
        <b>{`npm <command>`}</b>
        <b> </b>
        <b> </b>
        <b>{`Usage:`}</b>
        <b> </b>
        <b> </b>
        <b>{`npm install        install all the dependencies in your project`}</b>
        <b>{`npm install <foo>  add the <foo> dependency to your project`}</b>
        <b>{`npm test           run this project's tests`}</b>
        <b>{`npm run <foo>      run the script named <foo>`}</b>
        <b>{`npm <command> -h   quick help on <command>`}</b>
        <b>{`npm -l             display usage info for all commands`}</b>
        <b>{`npm help <term>    search for help on <term>`}</b>
        <b>{`npm help npm       more involved overview`}</b>
        <b>{`npm about          developer information`}</b>
        <b> </b>
        <b> </b>
        <b>More configuration info: npm help config</b>
        <b>Configuration fields: npm help 9 config </b>
        <b> </b>
        <b> </b>
        <b>{`┌──(0w3n㉿kali)-[~]`}</b>
        <b>{`└─$ npm about `}</b>
        <b> </b>
        <b> </b>
        <b className={estilos.b1}>Desarrollador: Owen Nicolas Perez Bonoris</b>
        <b> </b>
        <b className={estilos.b2}><img src={linkedin} alt="icon" className={estilos.icon}/>  Linkedin: <a className={estilos.linkedin} href="https://www.linkedin.com/in/owen-bonoris-80b150168/">https://www.linkedin.com/in/owen-bonoris-80b150168/</a></b>
        <b className={estilos.b3}><img src={gmail} alt="icon" className={estilos.icon}/>  Gmail: <a  className={estilos.linkedin} href="mailto:owenpbonoris@gmail.com?Subject=Interesad@%20en%20contratarte%20Owen">owenpbonoris@gmail.com</a></b>
        <b> </b>
        <b className={estilos.b4}>Esta página ha sido creada para el Proyecto Individual</b>
        <b className={estilos.b5}>de la empresa SoyHenry en el Bootcamp de Desarrollo Web Full </b>
        <b className={estilos.b6}>Stack, la misma ha sido completa y únicamente creada por mí,</b>
        <b className={estilos.b7}>tanto Front-End como Back-End como la Base de Datos, fue creada </b>
        <b className={estilos.b8}>utilizando JavaScript, React, Redux, Express, SQL - Sequelize, </b>
        <b className={estilos.b9}>CSS y un poco de Testing.</b>
        </div>
        <img  className={estilos.Img}  alt="hackerpng" src={hacker}/>
        </div> {/* contenedor imagen y texto */}
        </div>
        </div>
        </div>
    )
}
            // eslint-disable-next-line no-lone-blocks
            {/* // <div className={estilos.Contenedor1}>
            //     <Link to={"/home"} className={estilos.Link}><button onClick={handleClickBack} className={estilos.BackButton}>GO HOME</button></Link>
            //     <div className={estilos.Contenedor}>
            //     <h1 className={estilos.Title}>Desarrollador: Owen Nicolas Perez Bonoris</h1>
            //     <img  className={estilos.Img}  alt="hackerpng" src="http://pngimg.com/uploads/hacker/hacker_PNG33.png"/>
            //     <h2 className={estilos.Text}>Esta página ha sido creada para el Proyecto Individual de la empresa SoyHenry en el Bootcamp de Desarrollo Web Full Stack, la misma ha sido completa y únicamente creada por mí, tanto Front-End como Back-End como la Base de Datos, fue creada utilizando JavaScript, React, Redux, Express, SQL - Sequelize, CSS y un poco de Testing.</h2>
            // </div>
            // </div> */}

            // Esta página ha sido creada para el Proyecto Individual
            // de la empresa SoyHenry en el Bootcamp de Desarrollo Web Full 
            // Stack, la misma ha sido completa y únicamente creada por mí, 
            // tanto Front-End como Back-End como la Base de Datos, fue creada 
            // utilizando JavaScript, React, Redux, Express, SQL - Sequelize, 
            // CSS y un poco de Testing.