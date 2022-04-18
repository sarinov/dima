

const validateInt = function(args){
    for(let key in args){
        if(typeof args[key] != "undefined"){
            args[key] = parseInt(args[key])
            if(isNaN(args[key])) return {ok: false, key, message: `Incorrect "${key}"`}
        }
    }
    return {ok: true}
}

const validateString = function(args){
    for(let key in args){
        if(typeof args[key] != "undefined"){
            args[key] = args[key].trim();
            if(!args[key] || typeof args[key] !== 'string') return {ok: false, key, message: `Incorrect "${key}"`}
        }
    }
    return {ok: true}
}

module.exports = {
    validateInt,
    validateString
}
