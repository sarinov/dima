

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

const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };


module.exports = {
    validateInt,
    validateString,
    validateEmail
}
