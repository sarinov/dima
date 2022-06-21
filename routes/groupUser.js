const { Router } = require('express')
const Response = require('../utils/ApiResponse')
const resp = new Response();
const {validateInt, validateString} = require('../utils/validator')

const groupUsersController = require('../controllers/groupUsers')

const router = Router()

router

.get('/', async (req, res) => {
    try{
        return res.send(resp.data(await groupUsersController.getAll()))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})

.get('/:id', async (req, res) => {
    const {id} = req.params;
    const validation = validateInt({id})
    if(!validation.ok)  return res.status(400).send(resp.error(validation.message))

    try{
        const result = await groupUsersController.getOne(id);
        if(!result) return res.status(400).send(resp.error("Comment doesn`t exist!"))
        return res.send(resp.data(result))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})

.post('/', async (req, res) => {
    const {groupId, listUser} = {...req.body}

    let allResult

    console.log(listUser)

    for(let userId of listUser){
        console.log(userId)
            const validationInt = validateInt({groupId, userId})
            if(!validationInt.ok)  return res.status(400).send(resp.error(validationInt.message))

            try{
                const result = await groupUsersController.create({groupId, userId});
                allResult += result
            }catch(e){
                return res.status(500).send(resp.error(e.message))
            }
    }
    return res.send(resp.data(allResult))

})

.put("/:id", async (req, res) => {

    const {id} = req.params;
    const {groupId, userId} = {...req.body, ...req.user}

    const validationInt = validateInt({groupId, userId})
    if(!validationInt.ok)  return res.status(400).send(resp.error(validationInt.message))

    try{
        const result = await groupUsersController.update(id, {groupId, userId});
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
        const result = await groupUsersController.delete(id);
        return res.send(resp.data(result))
    }catch(e){
        return res.status(500).send(resp.error(e.message))
    }
})


module.exports = router;
