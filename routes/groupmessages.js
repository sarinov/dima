const { Router } = require('express')
const Response = require('../utils/ApiResponse')
const resp = new Response();
const {validateInt, validateString} = require('../utils/validator')

const groupMessagesController = require('../controllers/groupmessages')

const router = Router()

router

.get('/', async (req, res) => {
    try{
        return res.send(resp.data(await groupMessagesController.getAll()))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})

.get('/:id', async (req, res) => {
    const {id} = req.params;
    const validation = validateInt({id})
    if(!validation.ok)  return res.status(400).send(resp.error(validation.message))

    try{
        const result = await groupMessagesController.getOne(id);
        if(!result) return res.status(400).send(resp.error("Comment doesn`t exist!"))
        return res.send(resp.data(result))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})

.post('/', async (req, res) => {
    const {groupId, fromId, messageId, isRead, isRecived, status} = {...req.body, ...req.user}

    const validationStr = validateString({status})
    if(!validationStr.ok)  return res.status(400).send(resp.error(validationStr.message))

    const validationInt = validateInt({groupId, fromId, messageId})
    if(!validationInt.ok)  return res.status(400).send(resp.error(validationInt.message))

    try{
        const result = await groupMessagesController.create({groupId, fromId, messageId, isRead, isRecived, status});
        return res.send(resp.data(result))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }

})

.put("/:id", async (req, res) => {

    const {id} = req.params;
    const {groupId, fromId, messageId, isRead, isRecived, status} = {...req.body, ...req.user}

    const validationStr = validateString({status})
    if(!validationStr.ok)  return res.status(400).send(resp.error(validationStr.message))

    const validationInt = validateInt({groupId, fromId, messageId})
    if(!validationInt.ok)  return res.status(400).send(resp.error(validationInt.message))

    try{
        const result = await groupMessagesController.update(id, {groupId, fromId, messageId, isRead, isRecived, status});
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
        const result = await groupMessagesController.delete(id);
        return res.send(resp.data(result))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})


module.exports = router;
