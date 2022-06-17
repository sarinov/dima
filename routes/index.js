const { Router } = require("express")
const { verifyToken } = require('../middlewares/auth')
const router = Router();


router

.use('/comments', verifyToken, require('./comments'))

.use('/groups', verifyToken, require('./groups'))

.use('/chat', require('./chat'))

.use('/groupMessages', require('./groupmessages'))

.use('/posts', require('./posts'))

.use('/groupUsers', verifyToken, require('./groupUser'))

.use('/messages', verifyToken,  require('./messages'))

.use('/postLikes', require('./postLikes'))

.use('/users', require('./users'))

.use('/privateMessages', require('./privateMessages'))


module.exports = router;
