let userArr = []

const methods = {
    getUserArr : null,
    changeUserArr : null
}

methods.getUserArr = function () {
    return userArr
}

methods.addUserArr = function (data) {
    userArr.push(data)
}

module.exports = methods