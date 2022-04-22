const { Group, GroupUser, User } = require('../../models');
const methods = {}



methods.getAll = async function(){
    const result = Group.findAll();
    return result;
}

methods.getOne = async function(id){
    const result = Group.findByPk(id);
    return result;
}

methods.create = async function(data){
    data.start = new Date(data.start).toISOString().slice(0, 19).replace('T', ' ');
    data.end = new Date(data.end).toISOString().slice(0, 19).replace('T', ' ');

    const result = Group.create(data);
    return result;
}


methods.update = async function(id, data){
    if(data.start) data.start = new Date(data.start).toISOString().slice(0, 19).replace('T', ' ');
    if(data.end) data.end = new Date(data.end).toISOString().slice(0, 19).replace('T', ' ');

    const result = Group.update(data, {
        where: {
            id
        }
    });
    return result;
}

methods.delete = async function(id){
    const result = Group.destroy({
        where: {id}
    })
    return result;
}

methods.usersList = async function(id){
    const result = GroupUser.findAll({
        where: {
            groupId : id
        },
        include: [{
            model: User,
            require: false
        }]
    });

    return result;
}

// methods.usersList = async function(id){
//     const result = User.findOne({
//         where: {
//             groupId : id
//         }
//     });
//
//     return result;
// }


module.exports = methods;
