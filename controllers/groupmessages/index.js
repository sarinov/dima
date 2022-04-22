const { GroupMessage } = require('../../models');
const methods = {}



methods.getAll = async function(){
    const result = GroupMessage.findAll();
    return result;
}

methods.getOne = async function(id){
    const result = GroupMessage.findByPk(id);
    return result;
}

methods.create = async function(data){
    const result = GroupMessage.create(data);
    return result;
}


methods.update = async function(id, data){
    const result = GroupMessage.update(data, {
        where: {
            id
        }
    });
    return result;
}

methods.delete = async function(id){
    const result = GroupMessage.destroy({
        where: {id}
    })
    return result;
}


module.exports = methods;
