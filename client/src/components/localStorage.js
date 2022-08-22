
export const setUserLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}

export const getLocalStorage = () => {
    if(localStorage.getItem('user')){
        let userActive = JSON.parse(localStorage.getItem('user'));
        return userActive;
    }
}

export const clearLocalStorage = () => {
    clearLocalStorage();
}