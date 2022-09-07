import React, { useEffect, useState } from 'react';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { getLocalStorage } from '../../handlers/localStorage';
import s from './Onboarding.module.scss';
import Loader from '../Login/Loader/Loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getDniForm } from '../../redux/userActions'
import { useDispatch } from 'react-redux';

import Swal from 'sweetalert2';

//auth0
import { useAuth0 } from '@auth0/auth0-react';

//assets
import welcomeImage from './assets/welcome image.svg';

//validator
import { validators } from '../../handlers/validators';


const Onboarding = () => {
  const email = getLocalStorage().mail;
  const last_name = getLocalStorage().last_name;
  const name = getLocalStorage().name;

  const navigate = useNavigate();
  const { logout } = useAuth0();

  const dispatch = useDispatch();

  const [user, setUser] = useStateWithCallbackLazy({
    name: name,
    last_Name: last_name,
    description: '',
    dni: '',
    image: 'noimage',
    date_of_Birth: '',
    mail: email,
    phone: 0,
    country: '',
    street: '',
    address: '',
    city: '',
    coordinate: [],
  })

  const [errors, setErrors] = useState({
    name: '',
    last_Name: '',
    description: '',
    dni: '',
    city: '',
    address: '',
    street: ''
  });

  const [errorGeometry, setErrorGeometry] = useState({
      error: '',
      loading: false,
  });

  // const [countries, setCountries] = useState({
  //   names: [],
  //   loading: false
  // });


  const [image, setImage] = useState(null);
  const [isUpload, setIsUpload] = useState({
    done: '',
    loading: false,
  });

  const [errorDni, setErrorDni] = useState("");

  const handleUpload = async () => {
    if(!image){
      return
    }else{
      setIsUpload({
        ...isUpload,
        loading: true,
      });
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "jobhub");
      const res = await axios.post("https://api.cloudinary.com/v1_1/jobhubapp/image/upload", formData);
      const file = await res.data;
      setIsUpload({
        done:'Image upload!',
        loading: false,
      });
      setUser({
        ...user,
        image: file.secure_url
      })
    }
  }


  const handleChange = (e) => {
    setErrorGeometry({
      ...errorGeometry,
      error: '',
    })
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  const handleSearchDni = async (e) => {
    e.preventDefault();
    handleChange(e);
    const{value} = e.target;
    dispatch(getDniForm(value)).then((res)=>{
    res !== 'El DNI ingresado puede ser utilizado' ? setErrorDni(res): setErrorDni("")
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(Object.keys(errors).length || errorGeometry.error || errorDni.length ) return alert("casi casi atrevido!! modifica el DNI, sino no se envia nada!")
    setErrorGeometry({
      error: '',
      loading: true,
    })
    let response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${user.address},${user.street},${user.city},${user.country}&format=json`);
    if(!response.data.length){
      setErrorGeometry({
        error: 'Verifica la dirección.',
        loading: false,
      })
    }else{
      setUser({
        ...user,
        coordinate: [response.data[0].lat, response.data[0].lon]
      }, async (currentUser) => {
          let response = await axios.post('/users', currentUser);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: response.data,
            showConfirmButton: false,
            timer: 1500
          })
          navigate("../", { replace: true })
          axios.get(`/mails/welcome?name=${currentUser.name}&mail=${currentUser.mail}`  )
      })
    }
  }

  const handleBack = () => {
    localStorage.clear();
    logout();
    navigate("../", { replace: true });
  }



  useEffect(() => {
    setErrors(validators(user));
  }, [user]);


  return (
    <div className={s.container}>
      
      <div className={s.card}>
        <div className={s.welcome}>
          <img src={welcomeImage} alt="welcome" />
          <h4>Bienvenid@ a JobHub!</h4>
          <p>{'Primera vez aquí?'}</p>
          <p>{'Por favor, completa tu perfil antes de continuar : )'}</p>
          <div className={s.back} onClick={handleBack}>
            Atrás
          </div>
        </div>

        <div className={s.formulario}>
          <div className={s.header}>
            Datos
          </div>

          <form className={s.mainForm}>
              <div className={s.personal}>

                {/* NOMBRE */}
                <div className={s.input}>
                  <label>Nombre</label>
                  <input type="text" name="name" value={user.name} onChange={e => handleChange(e)}/>
                  {errors.name === 'Este campo es obligatorio' ? <p className={s.required}>*</p> : (errors.name ? <p className={s.error}>{errors.name}</p> : '')}
                </div>

                {/* PAIS */}
                <div className={s.input}>
                    <label>Pais</label>
                    <select name="country" value={user.country} onChange={e => handleChange(e)}>
                      <option key={'none'} value='none'>Selecciona un país</option>
                      <option value="Argentina">Argentina</option>
                      <option value="Uruguay">Uruguay</option>
                      <option value="Chile">Chile</option>
                      <option value="Paraguay">Paraguay</option>
                      <option value="Bolivia">Bolivia</option>
                      <option value="Brasil">Brasil</option>
                      <option value="Peru">Peru</option>
                    </select>
                    {user.country === 'none' || errors.country === 'Este campo es obligatorio' ? <p className={s.required}>*</p> : ''}
                </div>

                {/* APELLIDO */}
                <div className={s.input}>
                  <label>Apellido</label>
                  <input type="text" name="last_Name" value={user.last_Name} onChange={e => handleChange(e)}/>
                  {errors.last_Name === 'Este campo es obligatorio' ? <p className={s.required}>*</p> : (errors.last_Name ? <p className={s.error}>{errors.last_Name}</p> : '')}
                </div>

                {/* CIUDAD */}
                <div className={s.input}>
                  <label>Ciudad</label>
                  <input type="text" name="city" value={user.city} onChange={e => handleChange(e)}/>
                  {errors.city === 'Este campo es obligatorio' ? <p className={s.required}>*</p> : (errors.city ? <p className={s.error}>{errors.city}</p> : '')}
                </div>

                {/* DNI */}
                <div className={s.input}>
                  <label>Dni</label>
                  <input type="text" name="dni" value={user.dni} onChange={e => handleChange(e)} onBlur={e => handleSearchDni(e)}/>
                  {errors.dni === 'Este campo es obligatorio' ? <p className={s.required}>*</p> : (errors.dni ? <p className={s.error}>{errors.dni}</p> : '')}
                  {errorDni.length ? <p className={s.error}> {errorDni} </p> : ""}
                </div>

                {/* DIRECCION */}
                <div className={s.address}>
                  <div className={s.street}>
                    <label>Calle</label>
                    <input type="text" name="street" value={user.street} onChange={e => handleChange(e)}/>
                    {errors.street === 'Este campo es obligatorio' ? <p className={s.required}>*</p> : (errors.street ? <p className={s.error}>{errors.street}</p> : '')}
                  </div>
                  <div className={s.number}>
                    <label>Número</label>
                    <input type="text" name="address" value={user.address} onChange={e => handleChange(e)}/>
                    {errors.address === 'Este campo es obligatorio' ? <p className={s.required}>*</p> : (errors.address ? <p className={s.error}>{errors.address}</p> : '')}
                  </div>
                </div>
              </div>

              <div className={s.other}>
                {/* ABOUT */}
                <div className={s.description}>
                  <label>{'Descripción (Sobre tí)'}</label>
                  <textarea name="description" value={user.description} onChange={e => handleChange(e)}/>
                </div>

                {/* PROFILE IMAGE */}
                <div className={s.upload}>
                  <label>Imagen de perfil</label>
                  <input
                      type="file"
                      onChange={(event) => {
                      setImage(event.target.files[0])
                  }} className={s.inputfile}/>
                  {isUpload.loading ? <Loader/> :( isUpload.done ? '' :
                  <div className={s.uploadbtn} onClick={handleUpload}>
                    <p>Subir Imagen</p>
                  </div>)}
                  {isUpload.done ? <p className={s.isupload}>{isUpload.done}</p> : ''}
                </div>
              </div>

              {errorGeometry.loading ? <Loader/> : <input type="submit" className={s.submit} onClick={(e) => handleSubmit(e)} disabled={Object.keys(errors).length || errorGeometry.error || errorDni.length  }/>}
              {errorGeometry.error ? <p className={s.error}>{errorGeometry.error}</p> : ''}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Onboarding;