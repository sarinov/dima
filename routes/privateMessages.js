const { Router } = require('express')
const Response = require('../utils/ApiResponse')
const resp = new Response();
const {validateInt, validateString} = require('../utils/validator')

const privateMessagesController = require('../controllers/privateMessages')

const router = Router()

router

.get('/', async (req, res) => {
    try{
        return res.send(resp.data(await privateMessagesController.getAll()))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})

.get('/:id', async (req, res) => {
    const {id} = req.params;
    const validation = validateInt({id})
    if(!validation.ok)  return res.status(400).send(resp.error(validation.message))

    try{
        const result = await privateMessagesController.getOne(id);
        if(!result) return res.status(400).send(resp.error("Comment doesn`t exist!"))
        return res.send(resp.data(result))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})

.post('/', async (req, res) => {
    const {toId, fromId, messageId, isRead, isRecived, status} = {...req.body, ...req.user}

    const validationStr = validateString({status})
    if(!validationStr.ok)  return res.status(400).send(resp.error(validationStr.message))

    const validationInt = validateInt({toId, fromId, messageId})
    if(!validationInt.ok)  return res.status(400).send(resp.error(validationInt.message))

    try{
        const result = await privateMessagesController.create({toId, fromId, messageId, isRead, isRecived, status});
        return res.send(resp.data(result))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }

})

.put("/:id", async (req, res) => {

    const {id} = req.params;
    const {toId, fromId, messageId, isRead, isRecived, status} = {...req.body, ...req.user}

    const validationStr = validateString({status})
    if(!validationStr.ok)  return res.status(400).send(resp.error(validationStr.message))

    const validationInt = validateInt({toId, fromId, messageId})
    if(!validationInt.ok)  return res.status(400).send(resp.error(validationInt.message))

    try{
        const result = await privateMessagesController.update(id, {toId, fromId, messageId, isRead, isRecived, status});
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
        const result = await privateMessagesController.delete(id);
        return res.send(resp.data(result))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})


module.exports = router;
