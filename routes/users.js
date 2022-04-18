const { Router } = require('express')
const Response = require('../utils/ApiResponse')
const resp = new Response();
const {validateInt, validateString} = require('../utils/validator')

const usersController = require('../controllers/users')

const router = Router()

router

.get('/', async (req, res) => {
    try{
        return res.send(resp.data(await usersController.getAll()))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})

.get('/:id', async (req, res) => {
    const {id} = req.params;
    const validation = validateInt({id})
    if(!validation.ok)  return res.status(400).send(resp.error(validation.message))

    try{
        const result = await usersController.getOne(id);
        if(!result) return res.status(400).send(resp.error("Comment doesn`t exist!"))
        return res.send(resp.data(result))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})

.post('/', async (req, res) => {
    const {name, surname, email, phone, age, role} = {...req.body, ...req.user}

    const validationStr = validateString({name, surname, email, phone, role})
    if(!validationStr.ok)  return res.status(400).send(resp.error(validationStr.message))

    const validationInt = validateInt({age})
    if(!validationInt.ok)  return res.status(400).send(resp.error(validationInt.message))

    try{
        const result = await usersController.create({name, surname, email, phone, age, role});
        return res.send(resp.data(result))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }

})

.put("/:id", async (req, res) => {

    const {id} = req.params;
    const {name, surname, email, phone, age, role} = {...req.body, ...req.user}

    const validationStr = validateString({name, surname, email, phone, role})
    if(!validationStr.ok)  return res.status(400).send(resp.error(validationStr.message))

    const validationInt = validateInt({age})
    if(!validationInt.ok)  return res.status(400).send(resp.error(validationInt.message))

    try{
        const result = await usersController.update(id, {name, surname, email, phone, age, role});
        return res.send(resp.data(result))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }

})

.delete("/:id", async (req, res) => {
    const {id} = req.params;
    const validationInt = validateInt({id})
    if(!validationInt.ok)  return res.status(400).send(resp.error(validationInt.message))

    try{
        const result = await usersController.delete(id);
        return res.send(resp.data(result))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})


module.exports = router;