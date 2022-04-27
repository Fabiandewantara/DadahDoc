const router = require('express').Router()

const doctorController = require('../controllers/doctorController')

router.get('/doctors', doctorController.get)
router.get('/doctor/:id', doctorController.getById)
router.get('/doctor/user/:id', doctorController.getByUser)
router.put('/doctor/:id/:user?', doctorController.update)
router.delete('/doctor/:id', doctorController.delete)

module.exports = router