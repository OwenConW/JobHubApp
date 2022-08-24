export function validators(userInput, addressInput) {
    let errors = {};
  // Verificacion de campos vacios
    for (const key in userInput) {
        if(key === 'phone' || key === 'mail' || key === 'date_of_Birth' || key === 'image' || key === 'description' || key === 'isPremium') continue;
        if (!userInput[key]) {
          errors[key] = "Este campo es obligatorio";
        }
    }

    //street number
    if (!addressInput.number) {
        errors.number = "Este campo es obligatorio";
    }else if(!/^\d{1,5}$/g.test(addressInput.number)){
        errors.number = "Debe ser un numero de maximo 5 cifras.";
    }

    //street
    if (!addressInput.street) {
        errors.street = "Este campo es obligatorio";
    }else if (/[^a-zA-Z0-9\s]/g.test(addressInput.street)) {
        errors.street = "No debe contener caracteres especiales";
    }

    //Nombre
    if (/[^a-zA-Z\s]/g.test(userInput.name)) {
      errors.name = "No debe contener caracteres especiales";
    } else if (userInput.name.length >= 1 && !/^[A-Z]/g.test(userInput.name)) errors.name = "Debe empezar con Mayuscula"

    //Apellido
    if (/[^a-zA-Z\s]/g.test(userInput.last_Name)) {
      errors.last_Name = "No debe contener caracteres especiales";
    } else if (userInput.last_Name.length >= 1 && !/^[A-Z]/g.test(userInput.last_Name)) errors.last_Name = "Debe empezar con Mayuscula"

    //DNI

    if (!userInput.dni) {
      errors.dni = "Este campo es obligatorio";
    }else if (!/^(\d{1,3})\.(\d{3})\.(\d{3})$/g.test(userInput.dni)) {
      errors.dni = "El formato del DNI debe ser solo numeros separados por puntos.";
    }

    //ciudad
    if (/[^a-zA-Z\s]/g.test(userInput.city)) {
        errors.city = "No debe contener caracteres especiales";
      } else if (userInput.city.length >= 1 && !/^[A-Z]/g.test(userInput.city)) errors.city = "Debe empezar con Mayuscula"


    return errors;

  }