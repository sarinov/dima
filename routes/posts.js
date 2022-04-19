const { Router } = require('express')
const Response = require('../utils/ApiResponse')
const resp = new Response();
const {validateInt, validateString} = require('../utils/validator')

const postsController = require('../controllers/posts')

const router = Router()

router

.get('/', async (req, res) => {
    try{
        return res.send(resp.data(await postsController.getAll()))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})

.get('/:id', async (req, res) => {
    const {id} = req.params;
    const validation = validateInt({id})
    if(!validation.ok)  return res.status(400).send(resp.error(validation.message))

    try{
        const result = await postsController.getOne(id);
        if(!result) return res.status(400).send(resp.error("Comment doesn`t exist!"))
        return res.send(resp.data(result))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})

.post('/', async (req, res) => {
    const {title, description, img, viewed, content, userId} = {...req.body, ...req.user}

    const validationStr = validateString({title, description, img, content})
    if(!validationStr.ok)  return res.status(400).send(resp.error(validationStr.message))

    try{
        const result = await postsController.create({title, description, img, viewed, content, userId});
        return res.send(resp.data(result))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }

})

.put("/:id", async (req, res) => {

    const {id} = req.params;
    const {title, description, img, viewed, content, userId} = {...req.body, ...req.user}

    const validationStr = validateString({title, description, img, content})
    if(!validationStr.ok)  return res.status(400).send(resp.error(validationStr.message))

    try{
        const result = await postsController.update(id, {title, description, img, viewed, content, userId});
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
        const result = await postsController.delete(id);
        return res.send(resp.data(result))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})


module.exports = router;
