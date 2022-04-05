const { Router } = require('express')
const Response = require('../utils/ApiResponse')
const resp = new Response();


const usersController = require('../controllers/users')
const middle = require('../middlewares/test')

const router = Router()

router.get('/', (req, res) => {
    res.send(usersController.getUserArr())
})

.post('/', (req, res) => {
    usersController.addUserArr(res.body)
    res.send(usersController.getUserArr())
})


module.exports = router;