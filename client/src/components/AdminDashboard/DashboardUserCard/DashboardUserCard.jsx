import React from "react";
import s from './DashboardUserCard.module.scss';

function DashboardUserCard(props) {
  const {   id,
            name, 
            last_Name, 
            description, 
            dni, 
            image, 
            date_of_Birth, 
            mail,
            phone, 
            country, 
            city, 
            rating, 
            isPremium, 
            isProfessional, 
            isAdmin, 
            isBanned, 
            isActive, 
            professions } = props;



  console.log(professions);

  return (
    <div className={s.cardContainer}>
      <h1>Nombre: {name} {last_Name}</h1>
      <p>Description: {description}</p>
      <h4>DNI: {dni}</h4>
      <h4>Profesional: Si{isProfessional}</h4>
      <h4>Fecha de nacimiento: 17/03/1999{date_of_Birth}</h4>
      <img src={image} alt="profile-img" />
      <h4>Email: {mail}</h4>
      <h4>Telefono: {phone}</h4>
      <h4>Pais: {country}</h4>
      <h4>Ciudad: {city}</h4>
      <h4>Rating: {rating}</h4>
      <h4>Premium: Activo{isPremium}</h4>
      <h4>Admin: Si{isAdmin}</h4>
      <h4>Suspendido: Si{isBanned}</h4>
      <h4>Activo: Si{isActive}</h4>
      <h4>Profesiones: {professions?.map(p => {
        return (
          <h4>{p.name}</h4>
        )
      })}
      </h4>
    </div>
  )
}

export default DashboardUserCard;