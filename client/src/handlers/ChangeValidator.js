export function changeValidator (localStorage, user) {
    console.log('localStorage', localStorage)
    console.log('user', user)

    let localString = JSON.stringify(localStorage).toLowerCase()
    let userString = JSON.stringify(user).toLowerCase()


    return localString === userString
}

export function PremiumValidator (premium, professions) {



    
    if(professions){
        if(!premium && professions.length > 0){
            return true
        }
    }
    return false
}