import React from "react";
import s from './Edit.module.scss'
import { getLocalStorage, setUserLocalStorage } from '../../../../handlers/localStorage';
import { useState, useEffect } from "react";
import axios from "axios";
import { validators } from "../../../../handlers/validators.js";
import { changeValidator } from "../../../../handlers/ChangeValidator.js";
import { modifyUser } from "../../../../redux/userActions";

const Edit = () => {
  let localSt = getLocalStorage()
  let activeUser = { ...localSt, name: localSt.name[0].toUpperCase() + localSt.name.substring(1), last_Name: localSt.last_Name[0].toUpperCase() + localSt.last_Name.substring(1) }

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
    // console.log('USUARIO:', user)
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
  const [errorGeometry, setErrorGeometry] = useState({
    error: '',
    loading: false,
  });


  const handleSubmit = async (event) => {
    event.preventDefault();
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


    modifyUser(activeUser.id, user)
    let newValues = {
      ...localSt,
      name: user.name,
      last_Name: user.last_Name,
      description: user.description,
      dni: user.dni,
      image: user.image,
      date_of_Birth: user.date_of_Birth,
      mail: user.mail,
      phone: user.phone,
      country: user.country,
      city: user.city,
      coordinate: user.coordinate,
      street: user.street,
      address: user.address,
      isProfessional: user.isProfessional,
      professions: user.professions,
    }
    setUserLocalStorage(newValues)
  }
  // console.log('entre a Edit')
  // console.log('activeuser: ', activeUser)
  return (
    <div className={s.container}>



      <div className={s.inputDiv}>
        <div>Nombre</div>
        <input placeholder="Nombre" name="name" value={user.name} onChange={(event) => handleChange(event)}></input>
        {errors.name === 'Este campo es obligatorio' ? <p className={s.required}>*</p> : (errors.name ? <p className={s.error}>{errors.name}</p> : '')}
      </div>

      <div className={s.inputDiv}>
        <div>Apellido</div>
        <input placeholder="Apellido" name='last_Name' value={user.last_Name} onChange={(event) => handleChange(event)}></input>
        {errors.last_Name === 'Este campo es obligatorio' ? <p className={s.required}>*</p> : (errors.last_Name ? <p className={s.error}>{errors.last_Name}</p> : '')}
      </div>



      {/*VER DESPUES COMO ES EL TEMA DE CAMBIO DE MAIL*/}
      {/* <div className={s.inputDiv}>
        <div>Mail</div>
        <input placeholder="mail" name='mail' value={user.mail} onChange={(event) => handleChange(event)}></input>
      </div> */}

      <div className={s.inputDiv}>
        <div>Telefono</div>
        <input placeholder="Telefono" name='phone' value={user.phone} onChange={(event) => handleChange(event)}></input>
      </div>

      <div className={s.inputDiv}>
        <div>DNI</div>
        <input placeholder="dni" name='dni' value={user.dni} onChange={(event) => handleChange(event)}></input>
        {errors.dni === 'Este campo es obligatorio' ? <p className={s.required}>*</p> : (errors.dni ? <p className={s.error}>{errors.dni}</p> : '')}
      </div>


      <div className={s.inputDiv}>
        <div>Pais</div>
        <select name='country' value={user.country} onChange={(event) => handleChange(event)}>

          <option key={'none'} value={user.country}>{user.country}</option>
          {
            countries.names.map(country => {
              return (
                <option value={country} key={country}>{country}</option>
              )
            })
          }

        </select>
      </div>

      <div className={s.inputDiv}>
        <div>Ciudad</div>
        <input placeholder="Ciudad" name='city' value={user.city} onChange={(event) => handleChange(event)}></input>
        {errors.city === 'Este campo es obligatorio' ? <p className={s.required}>*</p> : (errors.city ? <p className={s.error}>{errors.city}</p> : '')}
      </div>

      <div className={s.inputDiv}>
        <div>Calle</div>
        <input placeholder="Calle" name='street' value={user.street} onChange={(event) => handleChange(event)}></input>
        {errors.street === 'Este campo es obligatorio' ? <p className={s.required}>*</p> : (errors.street ? <p className={s.error}>{errors.street}</p> : '')}
      </div>

      <div className={s.inputDiv}>
        <div>Número</div>
        <input placeholder="Tu direccion" name='address' value={user.address} onChange={(event) => handleChange(event)}></input>
        {errors.address === 'Este campo es obligatorio' ? <p className={s.required}>*</p> : (errors.address ? <p className={s.error}>{errors.address}</p> : '')}
      </div>

      <div className={s.inputDiv}>
        <div>Ser Profesional</div>
        <input type="checkbox" name='isProfessional' checked={user.isProfessional} onClick={clickToBeProffessional}></input>
      </div>

      <div className={s.descriptionDiv}>
        <div>Descripcion</div>
        <textarea className={s.description} placeholder="Descripcion personal" name='description' value={user.description} onChange={(event) => handleChange(event)}></textarea>
      </div>

      <input type="submit" className={s.submit} onClick={handleSubmit} disabled={changeValidator(comparative, user) || Object.keys(errors).length} />

    </div>
  )


}


export default Edit