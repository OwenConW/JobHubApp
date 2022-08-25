
export const setUserLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}

export const getLocalStorage = () => {
    if (localStorage.getItem('user')) {
        let userActive = JSON.parse(localStorage.getItem('user'));





        // let userActive = {
            
        //         id: 2,
        //         name: "Martin",
        //         last_Name: "Morales",
        //         description: "Mejor corredor de la historia ",
        //         dni: "81.321.442",
        //         image: "https://static.dw.com/image/17910578_303.jpg",
        //         date_of_Birth: null,
        //         mail: "schumis@hotmail.com",
        //         phone: "1656158172",
        //         country: "argentina",
        //         city: "Buenos aires",
        //         coordinate: [ "421","-22" ],
        //         street: "Directorio",
        //         address: "5000",
        //         rating: -1,
        //         isPremium: true,
        //         isProfessional: true,
        //         isAdmin: false,
        //         isBanned: false,
        //         isActive: true,
        //         professions: [],
        //         reviews: []
        // }


        return userActive;
    }
}
