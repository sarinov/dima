

function testMiddle (req,res,next) {
    if(req.body.arr) return next()
    next(new Error('Netu arr;'))
}


module.exports = testMiddle;