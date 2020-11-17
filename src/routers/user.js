const { Router } = require('express')
const router = Router()
const { registerUser } = require('../controllers/user')

router.post('/register', registerUser)
// router.post('/login')

module.exports = router
