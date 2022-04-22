const { Router } = require("express")
const { verifyToken } = require('../middlewares/auth')
const router = Router();


router.use('/comments', verifyToken, require('./comments'))

router.use('/groups', require('./groups'))

router.use('/groupMessages', require('./groupmessages'))

router.use('/posts', require('./posts'))

router.use('/groupUsers', require('./groupUser'))

router.use('/messages', require('./messages'))

router.use('/postLikes', require('./postLikes'))

router.use('/users', require('./users'))

router.use('/privateMessages', require('./privateMessages'))





module.exports = router;
