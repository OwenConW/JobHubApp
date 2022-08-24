import React from "react";
import s from './Edit.module.scss'
import { getLocalStorage } from '../../../../handlers/localStorage';
import { useState, useEffect } from "react";
import axios from "axios";
import { validators } from "../../../../handlers/validators";

const Edit = () => {
  let activeUser = getLocalStorage()
  const email = activeUser.mail

  //USER LOCAL PARA ENVIAR A BASE DE DATOS EN CASO DE HACER CAMBIOS
  const [user, setUser] = useState({
    name: activeUser.name,
    last_Name: activeUser.last_Name,
    description: activeUser.description,
    mail: activeUser.mail,
    dni: activeUser.dni,
    image: activeUser.image,
    phone: activeUser.phone,
    country: activeUser.country,
    city: activeUser.city,
    coordinate: activeUser.coordinate,
    professions: activeUser.professions,
    isPremium: activeUser.isPremium,
    street: activeUser.street,
    address: activeUser.address
  })

  //HandleChange de inputs
  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  }

  useEffect(() => {
    // console.log(user)
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

  const [address, setAddress] = useState({
    street:user.street,
    number:user.address,
  });


  const [errors, setErrors] = useState({
    name: '',
    last_Name: '',
    description: '',
    dni: '',
    city: '',
  });
  useEffect(() => {
    setErrors(validators(user, address));
    console.log(errors)
  }, [user, address]);

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

      <div className={s.descriptionDiv}>
        <div>Descripcion</div>
        <textarea className={s.description} placeholder="Descripcion personal" name='description' value={user.description} onChange={(event) => handleChange(event)}></textarea>
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
      </div>

      <div className={s.inputDiv}>
        <div>Número</div>
        <input placeholder="Tu direccion" name='address' value={user.address} onChange={(event) => handleChange(event)}></input>
      </div>


    </div>
  )


}


export default Edit