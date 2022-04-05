const {Router} = require('express');
const Response = require('../utils/ApiResponse')
const resp = new Response();

const testController = require('../controllers/test')
const middle = require('../middlewares/test')

const router = Router();

router

.get('/', async (req, res) => {
    res.send('ok')
})

.post('/', async (req, res) =>{
    res.send('ok post')
})

.post('/findMin', middle, async (req, res) =>{

    const { arr } = req.body;

    if(!Array.isArray(arr)) return res.status(400).json(resp.error('Incoorect array!'))

    const result = testController.findMin(arr);

    res.json(resp.data(result))
})


module.exports = router;