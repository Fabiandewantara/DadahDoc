const router = require('express').Router()

const consultationController = require('../controllers/consultationController')

router.get('/consultations/:user/:id', consultationController.get)
router.post('/consultation', consultationController.create)
router.delete('/consultation/:id', consultationController.delete)

module.exports = router