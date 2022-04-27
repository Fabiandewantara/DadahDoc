const router = require('express').Router()

const userController = require('../controllers/userController')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/user/:id', userController.getById)
router.put('/user/:id', userController.update)

module.exports = router