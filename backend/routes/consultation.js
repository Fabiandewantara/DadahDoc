const router = require('express').Router()

const consultationController = require('../controllers/consultationController')

router.get('/consultations/:user/:id', consultationController.get)
router.post('/consultation', consultationController.create)
router.delete('/consultation/:id', consultationController.delete)
router.put('/consultation/:id', consultationController.update)
router.get('/consultation/:id', consultationController.getById)

module.exports = router