const { Chat } = require('../../models');
const methods = {}

const { Op } = require("sequelize");



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

methods.createChat = async function(fromId, toId){

    const chat = await Chat.findOne({
        where:{
            [Op.or]: [{fromId: fromId, toId: toId}, {fromId: toId, toId: fromId} ]
        }
    })
    if(chat){
        return chat.id;
    }
    const new_chat = await Chat.create({
        fromId, toId,
    })
    return new_chat.id;
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
