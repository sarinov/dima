const { Chat } = require('../../models');
const methods = {}



methods.getAll = async function(){
    const result = Chat.findAll();

    return result;
}

methods.getOne = async function(id){
    const result = Chat.findByPk(id);
    return result;
}

methods.create = async function(data){
    const result = Chat.create(data);
    return result;
}


methods.update = async function(id, data){
    const result = Chat.update(data, {
        where: {
            id
        }
    });
    return result;
}

methods.delete = async function(id){
    const result = Chat.destroy({
        where: {id}
    })
    return result;
}


module.exports = methods;
