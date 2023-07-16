const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user.controller.js')

router.post('/login', userCtrl.login)

router.post('/signup', userCtrl.signup)

module.exports = router
