const { PostLike } = require('../../models');
const methods = {}



methods.getAll = async function(){
    const result = PostLike.findAll();
    return result;
}

methods.getOne = async function(id){
    const result = PostLike.findByPk(id);
    return result;
}

methods.create = async function(data){
    const result = PostLike.create(data);
    return result;
}


methods.update = async function(id, data){
    const result = PostLike.update(data, {
        where: {
            id
        }
    });
    return result;
}

methods.delete = async function(id){
    const result = PostLike.destroy({
        where: {id}
    })
    return result;
}


module.exports = methods;
