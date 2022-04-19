const { GroupUser } = require('../../models');
const methods = {}



methods.getAll = async function(){
    const result = GroupUser.findAll();
    return result;
}

methods.getOne = async function(id){
    const result = GroupUser.findByPk(id);
    return result;
}

methods.create = async function(data){
    const result = GroupUser.create(data);
    return result;
}


methods.update = async function(id, data){
    const result = GroupUser.update(data, {
        where: {
            id
        }
    });
    return result;
}

methods.delete = async function(id){
    const result = GroupUser.destroy({
        where: {id}
    })
    return result;
}


module.exports = methods;
