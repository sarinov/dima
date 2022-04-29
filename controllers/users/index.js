const { User, PrivateMessage, Messages } = require('../../models');
const config = require('../../config/config.json')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const methods = {}



methods.getAll = async function(){
    const result = User.findAll();
    return result;
}

methods.getOne = async function(id){
    const result = User.findByPk(id);
    return result;
}

methods.create = async function(data){
    const result = User.create(data);
    return result;
}


methods.update = async function(id, data){
    const result = User.update(data, {
        where: {
            id
        }
    });
    return result;
}

methods.delete = async function(id){
    const result = User.destroy({
        where: {id}
    })
    return result;
}

methods.messagesList = async function(firstId, secondId){
    const result = PrivateMessage.findAll({
        where: {
            fromId : [firstId,secondId],
            toId : [secondId,firstId],
        },
        include: [{
            model: Messages,
            require: false
        }]
    });

    return result;
}


methods.registration = async function (name, surname, password, email, phone, age, role = 'user') {
    const user = await User.findOne({
        where: {
            email
        }
    })
    if (user) throw 'User already exist'
    const result = await User.create({
        name, surname, password, email, phone, age, role
    })
    var token = jwt.sign(JSON.parse(JSON.stringify({id: result.id, role: result.role})), config.secret, {expiresIn: 86400 * 30});
    jwt.verify(token, config.secret, function (err, data) {
        console.log(err, data);
    })
    result.password = null
    return {success: true, token, user: result};
}

methods.login = async function (password, email) {
    const user = await User
        .findOne({
            where: {
                email: email
            }
        })
    if (!user) {
        throw {
            success: false,
            message: 'Authentication failed. User not found.',
        };
    }
    const passwordIsValid = bcrypt.compareSync(
        password,
        user.password
    );
    if (passwordIsValid) {
        var token = jwt.sign(JSON.parse(JSON.stringify({id: user.id, role: user.role})), config.secret, {expiresIn: 86400 * 30});
        jwt.verify(token, config.secret, function (err, data) {
            console.log(err, data);
        })
        user.password = null
        return {success: true, token, user};
    } else {
        throw {success: false, message: 'Authentication failed. Wrong password.'};
    }
}

module.exports = methods;
