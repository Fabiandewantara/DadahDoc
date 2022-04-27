const router = require('express').Router()

const userRouter = require("./user")
const roleRouter = require("./role")
const scheduleRouter = require("./schedule")
const doctorRouter = require("./doctor")
const patientRouter = require("./patient")
const consultationRouter = require("./consultation")

router.use(userRouter)
router.use(roleRouter)
router.use(scheduleRouter)
router.use(doctorRouter)
router.use(patientRouter)
router.use(consultationRouter)

const { authenticate } = require('../middlewares/auth')

router.use(authenticate)



module.exports = router