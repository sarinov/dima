const { PrivateMessage } = require('../../models');
const methods = {}



methods.getAll = async function(){
    const result = PrivateMessage.findAll();
    return result;
}

methods.getOne = async function(id){
    const result = PrivateMessage.findByPk(id);
    return result;
}

methods.create = async function(data){
    const result = PrivateMessage.create(data);
    return result;
}


methods.update = async function(id, data){
    const result = PrivateMessage.update(data, {
        where: {
            id
        }
    });
    return result;
}

methods.delete = async function(id){
    const result = PrivateMessage.destroy({
        where: {id}
    })
    return result;
}


module.exports = methods;
