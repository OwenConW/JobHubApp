import React from "react"
import "./Images.css"
import img  from "./assets/noimage.jpg"
import axios from "axios"
import Loader from '../../../Login/Loader/Loader';

const Images = () => {
    let imgs = []
    const [PreImage1, setPreImage1] = React.useState(null)
    const [PreImage2, setPreImage2] = React.useState(null)
    const [PreImage3, setPreImage3] = React.useState(null)
    const [PreImage4, setPreImage4] = React.useState(null)
    const [imagen1, setImagen1] = React.useState(null)
    const [imagen2, setImagen2] = React.useState(null)
    const [imagen3, setImagen3] = React.useState(null)
    const [imagen4, setImagen4] = React.useState(null)
    const [loading1, setLoading1] = React.useState(null)
    const [loading2, setLoading2] = React.useState(null)
    const [loading3, setLoading3] = React.useState(null)
    const [loading4, setLoading4] = React.useState(null)
    const handleUploadImage = async (e) => {
        if(PreImage1){
            setLoading1(true)
            const formData = new FormData();
            formData.append("file", PreImage1);
            formData.append("upload_preset", "jobhub");
            const res = await axios.post("https://api.cloudinary.com/v1_1/jobhubapp/image/upload", formData);
            const file = await res.data;
            setImagen1(file.secure_url)
            imgs.push(file.secure_url)
            setPreImage1(null)
            setLoading1(null)
        }
        if(PreImage2){
            setLoading2(true)
            const formData2 = new FormData();
            formData2.append("file", PreImage2);
            formData2.append("upload_preset", "jobhub");
            const res = await axios.post("https://api.cloudinary.com/v1_1/jobhubapp/image/upload", formData2);
            const file = await res.data;
            setImagen2(file.secure_url)
            imgs[1] = file.secure_url
            setPreImage2(null)
            setLoading2(null)
        }
        if(PreImage3){
            setLoading3(true)
            const formData3 = new FormData();
            formData3.append("file", PreImage3);
            formData3.append("upload_preset", "jobhub");
            const res = await axios.post("https://api.cloudinary.com/v1_1/jobhubapp/image/upload", formData3);
            const file = await res.data;
            setImagen3(file.secure_url)
            imgs[2] = file.secure_url
            setPreImage3(null)
            setLoading2(null)
        }
        if(PreImage4){
            setLoading4(true)
            const formData4 = new FormData();
            formData4.append("file", PreImage4);
            formData4.append("upload_preset", "jobhub");
            const res = await axios.post("https://api.cloudinary.com/v1_1/jobhubapp/image/upload", formData4);
            const file = await res.data;
            setImagen4(file.secure_url)
            imgs[3] = file.secure_url
            setPreImage4(null)
            setLoading4(null)
        }
    }

    React.useEffect(() => {
       console.log("array para el back:", [imagen1, imagen2, imagen3, imagen4]);
    }, [imgs, imagen1, imagen2, imagen3, imagen4])

    return (
        <>
            <div className="contenedorImagenes">
                <div className="contenedorHeader">
                <h1 className="Title">Añadí fotos de tus mejores trabajos!</h1>
                <div className="contenedorBotonSave" onClick={handleUploadImage}>
                    <p>Guardar imagenes</p>
                </div>
                </div>
                {/* <button onClick={handleUploadImage}>Guardar Cambios</button> */}
                <div className="contenedorImagenes12">
                    <div className="Contenedorimagen1">
                        {
                            PreImage1 || imagen1 ? (
                                <></>
                            ) : (
                                <>
                                <input
                                type="file"
                                onChange={(event) => {
                                setPreImage1(event.target.files[0])
                                }}className="botonAdd4"/>
                            </>
                            )
                        }
                        {
                            PreImage1 ? (
                                <div className="loaderOk"> 
                                    {
                                        loading1 ? <Loader/> : <h1 className="alertSave">Cuando finalice guarde los cambios!</h1>
                                    }
                                </div>
                            ) : (
                                
                                imagen1 ? (
                                    <img className="imagen1" src={imagen1} alt=""/>
                                ) : (
                                    <div className="noImage12"></div>
                                )
                                
                            )
                        }
                    
                    </div>
                    <div className="Contenedorimagen2">
                    {
                            PreImage2 || imagen2 ? (
                                <></>
                            ) : (
                                <>
                                <input
                                type="file"
                                onChange={(event) => {
                                setPreImage2(event.target.files[0])
                                }}className="botonAdd4"/>
                            </>
                            )
                        }
                        {
                            PreImage2 ? (
                                <div className="loaderOk"> 
                                    {
                                        loading2 ? <Loader/> : <h1 className="alertSave">Cuando finalice guarde los cambios!</h1>
                                    }
                                </div>
                            ) : (
                                
                                imagen2 ? (
                                    <img className="imagen2" src={imagen2} alt=""/>
                                ) : (
                                    <div className="noImage12"></div>
                                )
                                
                            )
                        }
                    </div>
                </div>
                <div className="contenedorImagenes34">
                    <div className="Contenedorimagen3">
                    {
                            PreImage3 || imagen3 ? (
                                <></>
                            ) : (
                                <>
                                <input
                                type="file"
                                onChange={(event) => {
                                setPreImage3(event.target.files[0])
                                }}className="botonAdd4"/>
                            </>
                            )
                        }
                        {
                            PreImage3 ? (
                                <div className="loaderOk"> 
                                {
                                    loading3 ? <Loader/> : <h1 className="alertSave">Cuando finalice guarde los cambios!</h1>
                                }
                            </div>
                            ) : (
                                
                                imagen3 ? (
                                    <img className="imagen3" src={imagen3} alt=""/>
                                ) : (
                                    <div className="noImage34"></div>
                                )
                                
                            )
                        }
                    </div>
                    <div className="Contenedorimagen4" >
                    {
                            PreImage4 || imagen4 ? (
                                <></>
                            ) : (
                                <>
                                <input
                                type="file"
                                onChange={(event) => {
                                setPreImage4(event.target.files[0])
                                }}className="botonAdd4"/>
                            </>
                            )
                        }
                        {
                            PreImage4 ? (
                                <div className="loaderOk"> 
                                {
                                    loading4 ? <Loader/> : <h1 className="alertSave">Cuando finalice guarde los cambios!</h1>
                                }
                            </div>
                            ) : (
                                
                                imagen4 ? (
                                    <img className="imagen4" src={imagen4} alt=""/>
                                ) : (
                                    <div className="noImage34"></div>
                                )
                                
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )   
}



export default Images


