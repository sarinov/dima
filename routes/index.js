const { Router } = require("express")

const router = Router();


router.use('/test', require('./test'))

router.use('/user', require('./users'))



module.exports = router;