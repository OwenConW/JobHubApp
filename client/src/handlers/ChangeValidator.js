export function changeValidator (localStorage, user) {

    let localString = JSON.stringify(localStorage)
    let userString = JSON.stringify(user)


    return localString === userString
}

export function PremiumValidator (premium, professions) {
    if(!premium && professions.length > 0){
        return true
    }
    return false
}