const express = require('express')
const router = express.Router()
const { checkUser } = require('../middlewares/authorization')
const intersectCtrl = require('../controllers/intersection.controller')

router.post('/', checkUser, intersectCtrl.intersect)

module.exports = router
