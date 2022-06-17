const { Router } = require('express')
const postController = require('../controllers/posts')
const router = Router()

router

.get('/', async (req, res) => {
    const posts = await postController.getAll()
    res.render('pages/index', {posts});})

.get('/create-post', async (req, res) => {
    res.render('pages/create-post')
})

.get('/login', async (req, res) => {
    res.render('pages/login');
})

.get('/registration', async (req, res) => {
    res.render('pages/registration');
})

.get('/chat', async (req, res) => {
    res.render('pages/chat');
})

.get('/profile', async (req, res) => {
    res.render('pages/profile');
})





module.exports = router;
