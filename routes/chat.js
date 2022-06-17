const { Router } = require('express')
const Response = require('../utils/ApiResponse')
const resp = new Response();
const {validateInt, validateString} = require('../utils/validator')

const chatController = require('../controllers/chat')

const router = Router()

router

.post('/createChat', async (req, res) => {
    const {fromId, toId} = {...req.body, ...req.user}
    try{
        req.app.get('io').to(`user_${toId}`).emit("createdChat", {});

        return res.send(resp.data(await chatController.createChat(fromId, toId)))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})

.get('/', async (req, res) => {
    try{
        return res.send(resp.data(await chatController.getAll()))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})

.get('/:id', async (req, res) => {
    const {id} = req.params;
    const validation = validateInt({id})
    if(!validation.ok)  return res.status(400).send(resp.error(validation.message))

    try{
        const result = await chatController.getOne(id);
        if(!result) return res.status(400).send(resp.error("Comment doesn`t exist!"))
        return res.send(resp.data(result))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})


.post('/', async (req, res) => {
    const {fromId, toId} = {...req.body, ...req.user}

    const validationInt = validateInt({fromId, toId})
    if(!validationInt.ok)  return res.status(400).send(resp.error(validationInt.message))

    try{
        const result = await chatController.create({fromId, toId});
        return res.send(resp.data(result))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }

})

.put("/:id",  async (req, res) => {

    const {id} = req.params;
    const {fromId, toId} = {...req.body, ...req.user}

    const validationInt = validateInt({firstId, secondId})
    if(!validationInt.ok)  return res.status(400).send(resp.error(validationInt.message))

    try{
        const result = await chatController.update(id, {fromId, toId});
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
        const result = await chatController.delete(id);
        return res.send(resp.data(result))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})


module.exports = router;
