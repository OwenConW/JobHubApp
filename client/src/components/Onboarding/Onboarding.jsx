import React, { useEffect, useState } from 'react';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { getLocalStorage } from '../../handlers/localStorage';
import s from './Onboarding.module.scss';
import Loader from '../Loader/Loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//auth0
import { useAuth0 } from '@auth0/auth0-react';

//assets
import welcomeImage from './assets/welcome image.svg';

//validator
import { validators } from '../../handlers/validators';

const Onboarding = () => {
  const email = getLocalStorage().mail;
  const navigate = useNavigate();
  const { logout } = useAuth0();

  const [user, setUser] = useStateWithCallbackLazy({
    name: '',
    last_Name: '',
    description: '',
    dni: '',
    image: 'noimage',
    date_of_Birth: '',
    mail: email,
    phone: 0,
    country: '',
    city: '',
    coordinate: [],
  })

  const [errors, setErrors] = useState({
    name: '',
    last_Name: '',
    description: '',
    dni: '',
    city: '',
  });

  const [address, setAddress] = useState({
    street:'',
    number:'',
  });

  const [countries, setCountries] = useState({
    names: [],
    loading: false
  });


  const [image, setImage] = useState("");
  const [isUpload, setIsUpload] = useState({
     done: '',
     loading: false,
  });


  const handleUpload = async () => {
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


  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    let response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${address.number},${address.street},${user.city},${user.country}&format=json`);
    setUser({
      ...user,
      coordinate: [response.data[0].lat, response.data[0].lon]
    }, async (currentUser) => {
      console.log(currentUser);
      let response = await axios.post('/users', currentUser);
      console.log(response);
      navigate("../", { replace: true })
    })
  }

  const handleBack = () => {
    localStorage.clear();
    logout();
    navigate("../", { replace: true });
  }

  useEffect(() => {

    const getCountries = async () =>{
      setCountries({
        ...countries,
        loading: true,
      });

      try{
        let response = await axios.get('https://restcountries.com/v3.1/all');
        let namesOfCountries = response.data.map(country => country.translations.spa.common);
        namesOfCountries.sort();
        setCountries({
          ...countries,
          names: namesOfCountries,
          loading: false,
        });
      }catch(e){
        console.log(e)
      }
    }

    getCountries();

  }, []);

  useEffect(() => {
    setErrors(validators(user, address));
  }, [user, address]);


  return (
    <div className={s.container}>
      {countries.loading ? <Loader/> : (
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
                      {
                        countries.names.map(country => {
                          return(
                            <option value={country} key={country}>{country}</option>
                          )
                        })
                      }
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
                  <input type="text" name="dni" value={user.dni} onChange={e => handleChange(e)}/>
                  {errors.dni === 'Este campo es obligatorio' ? <p className={s.required}>*</p> : (errors.dni ? <p className={s.error}>{errors.dni}</p> : '')}
                </div>

                {/* DIRECCION */}
                <div className={s.address}>
                  <div className={s.street}>
                    <label>Calle</label>
                    <input type="text" value={address.street} onChange={e => setAddress({
                      ...address,
                      street: e.target.value
                    })}/>
                    {errors.street === 'Este campo es obligatorio' ? <p className={s.required}>*</p> : (errors.street ? <p className={s.error}>{errors.street}</p> : '')}
                  </div>
                  <div className={s.number}>
                    <label>Número</label>
                    <input type="text" value={address.number} onChange={e => setAddress({
                      ...address,
                      number: e.target.value
                    })}/>
                    {errors.number === 'Este campo es obligatorio' ? <p className={s.required}>*</p> : (errors.number ? <p className={s.error}>{errors.number}</p> : '')}
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

              <input type="submit" className={s.submit} onClick={(e) => handleSubmit(e)} disabled={Object.keys(errors).length}/>
          </form>
        </div>
      </div>)}
    </div>
  )
}

export default Onboarding;