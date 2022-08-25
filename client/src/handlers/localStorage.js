
export const setUserLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify({...user, name: user.name[0].toUpperCase() + user.name.substring(1), last_Name: user.last_Name[0].toUpperCase() + user.last_Name.substring(1)}));
}

export const getLocalStorage = () => {
    if (localStorage.getItem('user')) {
        let userActive = JSON.parse(localStorage.getItem('user'));

        return userActive;
    }
}
