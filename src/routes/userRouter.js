const express = require('express')
const router = express.Router()
const usersController = require("../controller/usersController")
const usersValidation = require('../validator/usersValidation')

router.post('/register', usersValidation.validateRegisterBody, usersController.registerUser)
router.post('/login', usersValidation.validateLoginBody, usersController.loginUser)

module.exports = router