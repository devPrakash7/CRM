const express = require('express');
const { login, logout } = require('../controller/manager_login');
const router = express.Router();
const  managerAuthenticate = require("../../middleware/manager.authentication")

router.post('/login' , login)
router.get('/logout' , managerAuthenticate ,  logout)



module.exports = router;
