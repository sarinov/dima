const { Router } = require('express')
const Response = require('../utils/ApiResponse')
const resp = new Response();
const {validateInt, validateString} = require('../utils/validator')

const commentsController = require('../controllers/comments')

const router = Router()

router

.get('/', async (req, res) => {
    try{
        return res.send(resp.data(await commentsController.getAll()))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})

.get('/:id', async (req, res) => {
    const {id} = req.params;
    const validation = validateInt({id})
    if(!validation.ok)  return res.status(400).send(resp.error(validation.message))

    try{
        const result = await commentsController.getOne(id);
        if(!result) return res.status(400).send(resp.error("Comment doesn`t exist!"))
        return res.send(resp.data(result))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})


.post('/', async (req, res) => {
    const {content, postId, userId, time} = {...req.body, ...req.user}

    const validationInt = validateInt({postId, userId})
    if(!validationInt.ok)  return res.status(400).send(resp.error(validationInt.message))

    const validationStr = validateString({content,time})
    if(!validationStr.ok)  return res.status(400).send(resp.error(validationStr.message))

    try{
        const result = await commentsController.create({content, postId, userId, time});
        return res.send(resp.data(result))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }

})

.put("/:id",  async (req, res) => {

    const {id} = req.params;
    const {content, postId, userId, time} = {...req.body, ...req.user}

    const validationInt = validateInt({postId, id})
    if(!validationInt.ok)  return res.status(400).send(resp.error(validationInt.message))

    const validationStr = validateString({content,time})
    if(!validationStr.ok)  return res.status(400).send(resp.error(validationStr.message))

    try{
        const result = await commentsController.update(id, {content, postId, userId, time});
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
        const result = await commentsController.delete(id);
        return res.send(resp.data(result))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})


module.exports = router;
