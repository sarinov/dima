const { Router } = require('express')
const Response = require('../utils/ApiResponse')
const resp = new Response();
const {validateInt, validateString} = require('../utils/validator')

const messagesController = require('../controllers/messages')

const router = Router()

router

.get('/', async (req, res) => {
    try{
        return res.send(resp.data(await messagesController.getAll()))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})

.get('/chatMessages/:chatId', async (req, res) => {
    const {chatId} = req.params;
    console.log(req.user)
    try{
        return res.send(resp.data(await messagesController.getChatMessages(chatId)))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})
.get('/chatMessages/group/:chatId', async (req, res) => {
    const {chatId} = req.params;
    console.log(req.user)
    try{
        return res.send(resp.data(await messagesController.getChatMessagesGroup(chatId)))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})

.put('/readMessages/:chatId', async (req, res) => {
    const {chatId} = req.params;
    try{
        return res.send(resp.data(await messagesController.putReadMessages(chatId)))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})


.get('/chats', async (req, res) => {
    try{
        return res.send(resp.data(await messagesController.getChatsList(req.user.userId)))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})

.post('/sendMessage', async (req, res) => {
    try{
        const {content, type, time, toId} = {...req.body, ...req.user}
        let chatId = await messagesController.sendMessage({content, type, time},req.user.userId,toId)
        req.app.get('io').to(`chat_${chatId}`).emit("sendMessage", {content, time, toId, chatId});
        return res.send(resp.data('Success'))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})

.post('/sendMessage/group', async (req, res) => {
    try{
        const {content, type, time, groupId} = {...req.body, ...req.user}
        let chatId = await messagesController.sendMessageGroup({content, type, time}, req.user.userId, groupId)
        req.app.get('io').to(`group_${groupId}`).emit("sendMessage", {content, time, fromId: req.user.userId, chatId: groupId});
        return res.send(resp.data('Success'))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})

.get('/:id', async (req, res) => {
    const {id} = req.params;
    const validation = validateInt({id})
    if(!validation.ok)  return res.status(400).send(resp.error(validation.message))

    try{
        const result = await messagesController.getOne(id);
        if(!result) return res.status(400).send(resp.error("Comment doesn`t exist!"))
        return res.send(resp.data(result))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})

.post('/', async (req, res) => {
    const {content, type, time} = {...req.body, ...req.user}

    const validationStr = validateString({content, type, time})
    if(!validationStr.ok)  return res.status(400).send(resp.error(validationStr.message))

    try{
        const result = await messagesController.create({content, type, time});
        return res.send(resp.data(result))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }

})

.put("/:id", async (req, res) => {

    const {id} = req.params;
    const {content} = {...req.body, ...req.user}

    const validationStr = validateString({content})
    if(!validationStr.ok)  return res.status(400).send(resp.error(validationStr.message))

    try{
        const result = await messagesController.update(id, {content});
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
        const result = await messagesController.delete(id);
        return res.send(resp.data(result))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})


module.exports = router;
