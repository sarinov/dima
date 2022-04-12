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
    let { arr } = req.body;
    usersController.addUserArr(arr)
    res.send(usersController.getUserArr())
})

.put("/:id", (req, res) => {

    let { id } = req.params;

    let { arr } = req.body;

    usersController.changeUserArr(id,arr)

    res.send(usersController.getUserArr())
})

.delete("/:id", async (req, res) => {

    let {id} = req.params;

    usersController.deleteUser(id);

    res.send(usersController.getUserArr())
})


module.exports = router;