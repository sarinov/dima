const { Messages, GroupMessage, PrivateMessage, User, Chat} = require('../../models');
const {Op} = require('sequelize')
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

methods.getChatsList = async function(userId){
    const chats = await Chat.findAll({
        where:{
            [Op.or]: [{fromId: userId}, {toId: userId}]
        }
    })
    const user = [];
    for(chat of chats){
        if(chat.fromId == userId ){
            user.push(await User.findByPk(chat.toId))
        }else{
            user.push(await User.findByPk(chat.fromId))
        }
    }

    return user;

}


module.exports = methods;
