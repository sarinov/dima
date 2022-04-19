const { Router } = require("express")

const router = Router();


router.use('/comments', require('./comments'))



module.exports = router;