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

methods.sendMessage = async function(data, fromId, toId){
    data.time = new Date(data.time).toISOString().slice(0, 19).replace('T', ' ');

    const message = await Messages.create(data);
    const chat = await Chat.findOne({
        where:{
            [Op.or]: [{fromId: fromId, toId: toId}, {fromId: toId, toId: fromId} ]
        }
    })
    const result = await PrivateMessage.create({
        fromId, toId, chatId: chat.id, messageId: message.id
    })
    return chat.id;
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
    let user = [];
    for(chat of chats){
        if(chat.toId == userId ){
            user.push({user: await User.findByPk(chat.fromId), chatId: chat.id})
        }else{
            user.push({user: await User.findByPk(chat.toId), chatId: chat.id})
        }
    }


    return user;

}

methods.getChatMessages = async function(chatId){
    const result = PrivateMessage.findAll({
        where: {
            chatId
        },
        include: [{
            model: Messages,
            require: false
        }]
    });

    return result;
}


module.exports = methods;
