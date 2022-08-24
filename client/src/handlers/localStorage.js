
export const setUserLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}

export const getLocalStorage = () => {
    if (localStorage.getItem('user')) {
        // let userActive = JSON.parse(localStorage.getItem('user'));





        let userActive = {
            name: "Martin",
            last_Name: "Morales",
            description: "Ideal para descontracturarse. Humor hardcore gay antifascista  ►Contacto maritobaracus@gmail.com",
            mail: "test2@gmail.com",
            dni: "83.332.125",
            image: "not image",
            phone: "1656158172",
            country: "Rusia",
            // postal_code: "1406",
            city: "Moscu",
            coordinate: ["421", "-22"],
            isProfessional: true,
            professions: [{ name: "extraterrestre" }, { name: "sovietico" }, { name: "militar" }, { name: "armamentista" }, { name: "electricista" }, { name: "gasista" }, { name: "programador" }],
            isPremium: false,
            street: 'Directorio',
            address: 4500
        }


        return userActive;
    }
}
