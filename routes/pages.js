const { Router } = require('express')
const postController = require('../controllers/posts')
const router = Router()

router

.get('/', async (req, res) => {
    const posts = await postController.getAll()
    res.render('pages/index', {posts});})

.get('/login', async (req, res) => {
    res.render('pages/login');
})





module.exports = router;
