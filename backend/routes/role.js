const router = require('express').Router()

const roleController = require('../controllers/roleController')

router.get('/roles', roleController.get)

module.exports = router