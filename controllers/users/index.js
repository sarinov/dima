const { User } = require('../../models');
const methods = {}



methods.getAll = async function(){
    const result = User.findAll();
    return result;
}

methods.getOne = async function(id){
    const result = User.findByPk(id);
    return result;
}

methods.create = async function(data){
    const result = User.create(data);
    return result;
}


methods.update = async function(id, data){
    const result = User.update(data, {
        where: {
            id
        }
    });
    return result;
}

methods.delete = async function(id){
    const result = User.destroy({
        where: {id}
    })
    return result;
}


module.exports = methods;
