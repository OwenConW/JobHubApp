import React from "react"
import "./Images.css"
import axios from "axios"
import Loader from '../../../Login/Loader/Loader';
import { getLocalStorage, setUserLocalStorage } from "../../../../handlers/localStorage";

const Images = () => {
        
    const activeUser = getLocalStorage()
  
    let imagenesEnTiempoReal = {
        imagen1: activeUser?.photo_gallery?.imagen1,
        imagen2: activeUser?.photo_gallery?.imagen2,
        imagen3: activeUser?.photo_gallery?.imagen3,
        imagen4: activeUser?.photo_gallery?.imagen4
    }

    const [imagenes, setImagenes] = React.useState(imagenesEnTiempoReal)

    React.useEffect(() => {
        if(Object.keys(activeUser?.photo_gallery).length){
            setImagenes({
                imagen1: imagenesEnTiempoReal.imagen1,
                imagen2: imagenesEnTiempoReal.imagen2,
                imagen3: imagenesEnTiempoReal.imagen3,
                imagen4: imagenesEnTiempoReal.imagen4
            })
        }
    }, [activeUser.id])

    const [PreImage1, setPreImage1] = React.useState(null)
    const [PreImage2, setPreImage2] = React.useState(null)
    const [PreImage3, setPreImage3] = React.useState(null)
    const [PreImage4, setPreImage4] = React.useState(null)
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
            imagenesEnTiempoReal = {
                ...imagenesEnTiempoReal,
                imagen1: file.secure_url
            }
            setImagenes(imagenesEnTiempoReal)
            setLoading1(null)
            setPreImage1(null)
        }
        if(PreImage2){
            setLoading2(true)
            const formData2 = new FormData();
            formData2.append("file", PreImage2);
            formData2.append("upload_preset", "jobhub");
            const res = await axios.post("https://api.cloudinary.com/v1_1/jobhubapp/image/upload", formData2);
            const file = await res.data;
            setLoading2(null)
            setPreImage2(null)
            imagenesEnTiempoReal = {
                ...imagenesEnTiempoReal,
                imagen2: file.secure_url
            }
            setImagenes(imagenesEnTiempoReal)
        }
        if(PreImage3){
            setLoading3(true)
            const formData3 = new FormData();
            formData3.append("file", PreImage3);
            formData3.append("upload_preset", "jobhub");
            const res = await axios.post("https://api.cloudinary.com/v1_1/jobhubapp/image/upload", formData3);
            const file = await res.data;
            setLoading3(null)
            setPreImage3(null)
            imagenesEnTiempoReal = {
                ...imagenesEnTiempoReal,
                imagen3: file.secure_url
            }
            setImagenes(imagenesEnTiempoReal)
        }
        if(PreImage4){
            setLoading4(true)
            const formData4 = new FormData();
            formData4.append("file", PreImage4);
            formData4.append("upload_preset", "jobhub");
            const res = await axios.post("https://api.cloudinary.com/v1_1/jobhubapp/image/upload", formData4);
            const file = await res.data;
            setLoading4(null)
            setPreImage4(null)
            imagenesEnTiempoReal = {
                ...imagenesEnTiempoReal,
                imagen4: file.secure_url
            }
            setImagenes(imagenesEnTiempoReal)
        }
        await axios.put(`/users/myjobs/${activeUser.id}`, imagenesEnTiempoReal) 
        const res = await axios.get(`/users/${activeUser.id}`)
        setUserLocalStorage(res.data)

    }

    
    const handleDelete = async (num) => {
        imagenesEnTiempoReal = {
            ...imagenesEnTiempoReal,
            [`imagen${num}`]: null
        }
        setImagenes({
            ...imagenes,
            [`imagen${num}`]: null
        })
        await axios.put(`/users/myjobs/${activeUser.id}`, imagenes) 
        const res = await axios.get(`/users/${activeUser.id}`)
        setUserLocalStorage(res.data)
    }

    React.useEffect(() => {
        return async () => {
            await axios.put(`/users/myjobs/${activeUser.id}`, imagenes) 
            const res = await axios.get(`/users/${activeUser.id}`)
            setUserLocalStorage(res.data)
        }
    }, [imagenes])


    return (
        <>
        {
            console.log("estado:", imagenes)
        }
            <div className="contenedorImagenes">
                <div className="contenedorHeader">
                <h1 className="Title">Añadí fotos de tus mejores trabajos!</h1>
                <div className="contenedorBotonSave" onClick={handleUploadImage}>
                    <p>Guardar imagenes</p>
                </div>
                </div>
                <div className="contenedorImagenes12">
                    <div className="Contenedorimagen1">
                        {
                            PreImage1 ||  imagenes.imagen1 ? (
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
                                
                                imagenes.imagen1 ? (
                                    <>
                                    <div className="botonDelete" onClick={() => handleDelete(1)}></div>
                                    <img className="imagen1" src={imagenes.imagen1} alt=""/>
                                    </>
                                ) : (
                                    <div className="noImage12"></div>
                                )
                                
                            )
                        }
                    
                    </div>
                    <div className="Contenedorimagen2">
                    {
                            PreImage2 ||  imagenes.imagen2? (
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
                                
                                imagenes.imagen2 ? (
                                    <>
                                    <div className="botonDelete" onClick={() => handleDelete(2)}></div>
                                    <img className="imagen2" src={imagenes.imagen2} alt=""/>
                                    </>
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
                            PreImage3 || imagenes.imagen3 ? (
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
                                
                                imagenes.imagen3 ? (
                                    <>
                                    <div className="botonDelete" onClick={() => handleDelete(3)}></div>
                                    <img className="imagen3" src={imagenes.imagen3} alt=""/>
                                    </>
                                ) : (
                                    <div className="noImage34"></div>
                                )
                                
                            )
                        }
                    </div>
                    <div className="Contenedorimagen4" >
                    {
                            PreImage4 || imagenes.imagen4 ? (
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
                                
                                imagenes.imagen4 ? (
                                    <>
                                    <div className="botonDelete" onClick={() => handleDelete(4)}></div>
                                    <img className="imagen4" src={imagenes.imagen4} alt=""/>
                                    </>
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


