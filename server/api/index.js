const router = require('express').Router();

router.use('/auth', require('./auth'))
router.use('/users', require('./users'))
router.use('/ranks', require('./rank'))

module.exports = router
