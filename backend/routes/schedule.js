const router = require('express').Router()

const scheduleController = require('../controllers/scheduleController')

router.get('/schedules', scheduleController.get)

module.exports = router