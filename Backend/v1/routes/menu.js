const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authenticate');
const adminAuthenticate = require('../../middleware/admin.authenticate');
const { add_menu, get_menu, update_menu } = require('../controllers/menu.controller');


router.post('/add_menu', adminAuthenticate ,add_menu);
router.get('/get_menu' , get_menu)
router.put('/update_menu/:id' , adminAuthenticate , update_menu)


module.exports = router;