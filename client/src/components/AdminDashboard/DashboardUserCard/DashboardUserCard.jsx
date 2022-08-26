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
      <div className={s.importantInformationContainer}>
        <div className={s.nameContainer}>
          <h1>Nombre</h1>
          <h1>{name} {last_Name}</h1>
        </div>
        <div>
          <h4>Premium</h4>
          <h4>Activo{isPremium}</h4>
        </div>
        <div>
          <h4>Admin</h4>
          <h4>Si{isAdmin}</h4>
        </div>
        <div>
          <h4>Activo</h4>
          <h4>Si{isActive}</h4>
        </div>
        <div>
          <h4>Profesional</h4>
          <h4>Si{isProfessional}</h4>
        </div>
        <div>
          <h4>Rating</h4>
          <h4>{rating}</h4>
        </div>
        <div>
          <h4>Suspendido</h4>
          <h4> Si{isBanned}</h4>
        </div>        
      </div>
      {/* Division */}
      <div>
        <h4>DNI: {dni}</h4>
        <h4>Fecha de nacimiento: 17/03/1999{date_of_Birth}</h4>
        <img src={image} alt="profile-img" />
        <h4>Email: {mail}</h4>
        <h4>Telefono: {phone}</h4>
        <h4>Pais: {country}</h4>
        <h4>Ciudad: {city}</h4>
        <p>Description: {description}</p>
        <h4>Profesiones: {professions?.map(p => {
          return (
            <h4>{p.name}</h4>
          )
        })}
        </h4>
      </div>
    </div>
  )
}

export default DashboardUserCard;