import React from "react";
import s from './Edit.module.scss'
import { getLocalStorage, setUserLocalStorage } from '../../../../handlers/localStorage';
import { useState, useEffect } from "react";
import axios from "axios";
import { validators } from "../../../../handlers/validators.js";
import { changeValidator } from "../../../../handlers/ChangeValidator.js";
import { modifyUser, setInactiveUser } from "../../../../redux/userActions";
import Swal from 'sweetalert2';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

const Edit = () => {

  const { logout } = useAuth0();
  const navigate = useNavigate()
  let localSt = getLocalStorage()
  let activeUser = { ...localSt, name: localSt.name[0].toUpperCase() + localSt.name.substring(1), last_Name: localSt.last_Name[0].toUpperCase() + localSt.last_Name.substring(1) }
  
  const [imgChange, setImgChange] = useState(undefined)

  //USER LOCAL PARA ENVIAR A BASE DE DATOS EN CASO DE HACER CAMBIOS

  const comparative = {
    name: activeUser.name,
    last_Name: activeUser.last_Name,
    description: activeUser.description,
    dni: activeUser.dni,
    image: activeUser.image,
    date_of_Birth: activeUser.date_of_Birth,
    mail: activeUser.mail,
    phone: activeUser.phone,
    country: activeUser.country,
    city: activeUser.city,
    coordinate: activeUser.coordinate,
    street: activeUser.street,
    address: activeUser.address,
    isProfessional: activeUser.isProfessional,
    professions: activeUser.professions,
  }

  const [user, setUser] = useState({
    name: activeUser.name,
    last_Name: activeUser.last_Name,
    description: activeUser.description,
    dni: activeUser.dni,
    image: activeUser.image,
    date_of_Birth: activeUser.date_of_Birth,
    mail: activeUser.mail,
    phone: activeUser.phone,
    country: activeUser.country,
    city: activeUser.city,
    coordinate: activeUser.coordinate,
    street: activeUser.street,
    address: activeUser.address,
    isProfessional: activeUser.isProfessional,
    professions: activeUser.professions,
  })

  //HandleChange de inputs
  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  }

  // Control del estado user
  useEffect(() => {
  }, [user])



  // PAISES DESDE LA API
  useEffect(() => {



    const getCountries = async () => {
      setCountries({
        ...countries,
        loading: true,
      });

      try {
        let response = await axios.get('https://restcountries.com/v3.1/all');
        let namesOfCountries = response.data.map(country => country.translations.spa.common);
        namesOfCountries.sort();
        setCountries({
          ...countries,
          names: namesOfCountries,
          loading: false,
        });
      } catch (e) {
        console.log(e)
      }
    }

    getCountries();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const [countries, setCountries] = useState({
    names: [],
    loading: false
  });



  const [errors, setErrors] = useState({
    name: '',
    last_Name: '',
    description: '',
    dni: '',
    city: '',
    address: '',
    street: ''
  });

  // VALIDATOR de DATOS
  useEffect(() => {
    setErrors(validators(user));
    // console.log(errors)
  }, [user]);

  const clickToBeProffessional = (event) => {
    user.isProfessional ?
      setUser({
        ...user,
        [event.target.name]: false
      }) :
      setUser({
        ...user,
        [event.target.name]: true
      })
  }
  // eslint-disable-next-line no-unused-vars
  const [errorGeometry, setErrorGeometry] = useState({
    error: '',
    loading: false,
  });

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", imgChange);
    formData.append("upload_preset", "jobhub");
    const res = await axios.post("https://api.cloudinary.com/v1_1/jobhubapp/image/upload", formData);
    const file = await res.data;
    setUser({
      ...user,
      image: file.secure_url
    })
  }




  const handleSubmit = async (event) => {
    if (event.target.value === 'Guardar Cambios') {
      let response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${user.address},${user.street},${user.city},${user.country}&format=json`);
      if (!response.data.length) {
        setErrorGeometry({
          error: 'Verifica la dirección.',
          loading: false,
        })
      } else {
        setUser({
          ...user,
          coordinate: [response.data[0].lat, response.data[0].lon]
        })
      }


      let newValues = {
        ...localSt,
        name: user.name.toLowerCase(),
        last_Name: user.last_Name.toLowerCase(),
        description: user.description,
        dni: user.dni,
        image: user.image,
        date_of_Birth: user.date_of_Birth,
        mail: user.mail,
        phone: user.phone,
        country: user.country,
        city: user.city,
        coordinate: [response.data[0].lat, response.data[0].lon],
        street: user.street,
        address: user.address,
        isProfessional: user.isProfessional,
        professions: user.professions,
      }
      console.log('coordenada new values', newValues.coordinate)
      setUserLocalStorage(newValues)

      modifyUser(activeUser.id, user)

      Swal.fire({
        icon: 'success',
        title: 'Cambios Guardados',
        showConfirmButton: false,
        timer: 1500
      })

      navigate("./")
    }
    if (event.target.value === 'Eliminar Cuenta') {
      Swal.fire({
        title: 'Estas seguro de que quieres eliminar tu cuenta?',
        text: "Podras restaurar tu cuenta mas adelante si asi lo deseas",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, quiero eliminarla',
        cancelButtonText: 'Cancelar',
      }).then((result) => {

        if (result.isConfirmed) {
          setInactiveUser(activeUser.id, { isActive: false })
          setUserLocalStorage({})
          Swal.fire(
            'Cuenta Eliminada!',
            'Esperamos que vuelvas pronto',
            'success'
          )
          logout();
          localStorage.clear()
          navigate("/")
        }


      })
    }

  }
  // console.log('entre a Edit')
  // console.log('activeuser: ', activeUser)
  return (
    <div className={s.container}>

      <div className={s.inputDiv}>
        <div>Foto de Perfil</div>
        <div className={s.errorInput}>
          <div className={s.imgContainer}>
            <img src={user.image} alt="" />
            <input type='file' className={s.imgButton} onChange={(event) => setImgChange(event.target.files[0])}></input>
            
          </div>
         
        </div>
        <button onClick={handleUpload} className={s.submit}>Subir Imagen</button>
      </div>


      <div className={s.inputDiv}>
        <div className={s.title}>Nombre</div>
        <div className={s.errorInput}>
          <input placeholder="Nombre" name="name" value={user.name} onChange={(event) => handleChange(event)}></input>
          {errors.name === 'Este campo es obligatorio' ? <p className={s.required}>*</p> : (errors.name ? <p className={s.error}>{errors.name}</p> : '')}
        </div>
      </div>

      <div className={s.inputDiv}>
        <div className={s.title}>Apellido</div>
        <div className={s.errorInput}>
          <input placeholder="Apellido" name='last_Name' value={user.last_Name} onChange={(event) => handleChange(event)}></input>
          {errors.last_Name === 'Este campo es obligatorio' ? <p className={s.required}>*</p> : (errors.last_Name ? <p className={s.error}>{errors.last_Name}</p> : '')}
        </div>
      </div>

      <div className={s.inputDiv}>
        <div className={s.title}>Mail</div>
        <div className={s.errorInput}>
          <input placeholder="mail" name='mail' value={user.mail} onChange={(event) => handleChange(event)}></input>
          {errors.last_Name === 'Este campo es obligatorio' ? <p className={s.required}>*</p> : (errors.last_Name ? <p className={s.error}>{errors.last_Name}</p> : '')}
        </div>
      </div>

      <div className={s.inputDiv}>
        <div className={s.title}>Telefono</div>
        <div className={s.errorInput}>
          <input placeholder="Telefono" name='phone' value={user.phone} onChange={(event) => handleChange(event)}></input>
        </div>
      </div>

      <div className={s.inputDiv}>
        <div className={s.title}>DNI</div>
        <div className={s.errorInput}>
          <input placeholder="dni" name='dni' value={user.dni} onChange={(event) => handleChange(event)}></input>
          {errors.dni === 'Este campo es obligatorio' ? <p className={s.required}>*</p> : (errors.dni ? <p className={s.error}>{errors.dni}</p> : '')}
        </div>
      </div>


      <div className={s.inputDiv}>
        <div className={s.title}>Pais</div>
        <select name='country' value={user.country} onChange={(event) => handleChange(event)} className={s.select}>

          <option key={'none'} value={user.country}>{user.country}</option>
                      <option value="Argentina">Argentina</option>
                      <option value="Uruguay">Uruguay</option>
                      <option value="Chile">Chile</option>
                      <option value="Paraguay">Paraguay</option>
                      <option value="Bolivia">Bolivia</option>
                      <option value="Brasil">Brasil</option>
                      <option value="Peru">Peru</option>

        </select>
      </div>

      <div className={s.inputDiv}>
        <div className={s.title}> Ciudad</div>
        <div className={s.errorInput}>
          <input placeholder="Ciudad" name='city' value={user.city} onChange={(event) => handleChange(event)}></input>
          {errors.city === 'Este campo es obligatorio' ? <p className={s.required}>*</p> : (errors.city ? <p className={s.error}>{errors.city}</p> : '')}
        </div>
      </div>

      <div className={s.inputDiv}>
        <div className={s.title}>Calle</div>
        <div className={s.errorInput}>
          <input placeholder="Calle" name='street' value={user.street} onChange={(event) => handleChange(event)}></input>
          {errors.street === 'Este campo es obligatorio' ? <p className={s.required}>*</p> : (errors.street ? <p className={s.error}>{errors.street}</p> : '')}
        </div>
      </div>

      <div className={s.inputDiv}>
        <div className={s.title}>Número</div>
        <div className={s.errorInput}>
          <input placeholder="Tu direccion" name='address' value={user.address} onChange={(event) => handleChange(event)}></input>
          {errors.address === 'Este campo es obligatorio' ? <p className={s.required}>*</p> : (errors.address ? <p className={s.error}>{errors.address}</p> : '')}
        </div>
      </div>

      <div className={s.inputDiv}>
        <div className={s.title}>Ser Profesional</div>
        <input type="checkbox" name='isProfessional' checked={user.isProfessional} onClick={clickToBeProffessional}></input>
      </div>

      <div className={s.descriptionDiv}>
        <div>Descripcion</div>
        <textarea className={s.description} placeholder="Descripcion personal" name='description' value={user.description} onChange={(event) => handleChange(event)}></textarea>
      </div>
      <div className={s.submitButtons}>
        <input type="submit" value='Eliminar Cuenta' className={s.disable} onClick={handleSubmit} />

        <input type="submit" value='Guardar Cambios' className={s.submit} onClick={handleSubmit} disabled={changeValidator(comparative, user) || Object.keys(errors).length} />
      </div>


    </div>
  )


}


export default Edit