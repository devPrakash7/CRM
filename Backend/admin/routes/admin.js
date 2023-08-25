const express = require('express');
const router = express.Router();
const adminAuthenticate = require('../../middleware/admin.authenticate')
const {
  login,
  logout,
} = require('../controllers/admin.controller');


router.post('/login',  login);
router.get('/logout', adminAuthenticate , logout);



module.exports = router;