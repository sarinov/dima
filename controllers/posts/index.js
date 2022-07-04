const { Post, Comment, User } = require('../../models');
const methods = {}



methods.getAll = async function(){
    const result = await Post.findAll({
        include: [{
            model: User,
            require: false
        }]
    });
    return result;
}

methods.getOne = async function(id){
    const result = Post.findOne({
        where: {
            id
        },
        include: [{
            model: Comment,
            require: false
        }]
    });
    return result;
}

methods.create = async function(data){
    const result = Post.create(data);
    return result;
}


methods.update = async function(id, data){
    const result = Post.update(data, {
        where: {
            id
        }
    });
    return result;
}

methods.delete = async function(id){
    const result = Post.destroy({
        where: {id}
    })
    return result;
}


module.exports = methods;
