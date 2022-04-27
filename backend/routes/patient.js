const router = require('express').Router()

const patientController = require('../controllers/patientController')

router.get('/patients', patientController.get)
router.get('/patient/:id', patientController.getById)
router.get('/patient/user/:id', patientController.getByUser)
router.put('/patient/:id/:user?', patientController.update)
router.delete('/patient/:id', patientController.delete)

module.exports = router