const { Messages } = require('../../models');
const methods = {}



methods.getAll = async function(){
    const result = Messages.findAll();
    return result;
}

methods.getOne = async function(id){
    const result = Messages.findByPk(id);
    return result;
}

methods.create = async function(data){
    data.time = new Date(data.time).toISOString().slice(0, 19).replace('T', ' ');

    const result = Messages.create(data);
    return result;
}


methods.update = async function(id, data){
    if(data.time) data.time = new Date(data.time).toISOString().slice(0, 19).replace('T', ' ');

    const result = Messages.update(data, {
        where: {
            id
        }
    });
    return result;
}

methods.delete = async function(id){
    const result = Messages.destroy({
        where: {id}
    })
    return result;
}


module.exports = methods;
