let userArr = []

const methods = {
    getUserArr : null,
    changeUserArr : null,
    deleteUser : null,
    addUserArr : null
}

methods.getUserArr = function () {
    return userArr
}

methods.addUserArr = function (data) {
    userArr.push(data)
}

methods.changeUserArr = function (index, arr) {
    userArr[index] = arr
}

methods.deleteUser = function (index) {
    userArr = userArr.splice(index,1)
}

module.exports = methods