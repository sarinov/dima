
const methods = {
    findMin: null,
    findMax: null
};


methods.findMin = function (arr) {
    let min = arr[0];

    for(let i of arr){
        if(min > i) min = i; 
    }

    return min;
}

methods.findMax = function (arr) {
    let min = arr[0];

    for(let i of arr){
        if(min < i) min = i; 
    }

    return min;
}

module.exports = methods;