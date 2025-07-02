const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth.middleware')
const userController = require('../controllers/user.controllers')

router.get('/getUser',auth,userController.getUser)

router.put('/updateUser',auth,userController.updateUser)

router.delete('/deleteUser',auth,userController.deleteUser)

module.exports = router