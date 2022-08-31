export function validators(userInput) {
    let errors = {};
  // Verificacion de campos vacios
    for (const key in userInput) {
        if(key === 'phone' || key === 'mail' || key === 'date_of_Birth' || key === 'image' || key === 'description' || key === 'isPremium' || key === 'isProfessional' || key === 'isAdmin'|| key === 'isBanned' || key === 'professions' || key === 'reviews') continue;
        if (!userInput[key]) {
          errors[key] = "Este campo es obligatorio";
        }
    }

    //street number
    if(!userInput.address){
      errors.address = "Este campo es obligatorio";
    }else if(!/^\d{1,5}$/g.test(userInput.address)){
      errors.address = "Debe ser un numero de maximo 5 cifras.";
    }

    //street
    if (/[^a-zA-Z0-9\s]/g.test(userInput.street)) {
        errors.street = "No debe contener caracteres especiales";
    }

    //Nombre
    if(!userInput.name){
      errors.name = "Este campo es obligatorio";
    } else if (/[^a-zA-Z\s]/g.test(userInput.name)) {
      errors.name = "No debe contener caracteres especiales";
    } else if (userInput.name.length <= 2 ) errors.name = "El nombre debe tener al menos 3 letras"

    //Apellido
    if(!userInput.last_Name){
      errors.last_Name = "Este campo es obligatorio";
    } else if (/[^a-zA-Z\s]/g.test(userInput.last_Name)) {
      errors.last_Name = "No debe contener caracteres especiales";
    } else if (userInput.last_Name.length < 2 ) errors.last_Name = "El apellido debe tener al menos 3 letras"

    //DNI
    if (!userInput.dni) {
      errors.dni = "Este campo es obligatorio";
    }else if (!/^(\d{1,3})\.(\d{3})\.(\d{3})$/g.test(userInput.dni)) {
      errors.dni = "El formato del DNI debe ser solo numeros separados por puntos.";
    }

    //ciudad
    if (/[^a-zA-Z\s]/g.test(userInput.city)) {
        errors.city = "No debe contener caracteres especiales";
      }
      //  else if (userInput.city.length >= 1 && !/^[A-Z]/g.test(userInput.city)) errors.city = "Debe empezar con Mayuscula"


    return errors;

  }