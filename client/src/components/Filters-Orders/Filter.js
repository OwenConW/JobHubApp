
export function orderA_z(array){
    return array.sort(sortArrayA_Z);
}
function sortArrayA_Z(x, y){
    if(x.name.toLowerCase() < y.name.toLowerCase()){
        return -1
    }
    if(x.name.toLowerCase() > y.name.toLowerCase()){
        return 1;
    }
    return 0
}

export function orderZ_a(array){
    return array.sort(sortArrayZ_A);
}
function sortArrayZ_A(x, y){
    if(x.name.toLowerCase() < y.name.toLowerCase()){
        return 1
    }
    if(x.name.toLowerCase() > y.name.toLowerCase()){
        return -1;
    }
    return 0
}

export function orderMin_MaxAttack(array){
    return array.sort(sortMin_Max);
}
function sortMin_Max(x, y){
    if(x.attack < y.attack){
        return -1
    }
    if(x.attack > y.attack){
        return 1;
    }
    return 0
}

export function orderMax_MinAttack(array){
    return array.sort(sortMax_Min);
}
function sortMax_Min(x, y){
    if(x.attack < y.attack){
        return 1
    }
    if(x.attack > y.attack){
        return -1;
    }
    return 0
}

export function filterByType(str, arr){
    // eslint-disable-next-line array-callback-return
    return arr.filter(p => {      
        if(p.id <= 40){
            if(p.types.length && p.types.includes(str)){
                return p
            }   
        }else{                   
            if(p.types.length && p.types.find(t => t.name === str)){
                return p
            }
        }

    })
}






