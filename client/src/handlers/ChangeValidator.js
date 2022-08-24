export function changeValidator (localStorage, user) {

    let localString = JSON.stringify(localStorage)
    let userString = JSON.stringify(user)


    return localString === userString
}