const express = require('express');
const router = express.Router();
const adminAuthenticate = require('../../middleware/admin.authenticate');
const { add_role, search_all_role, update_role  } = require('../controllers/role.controller');
const {add_role_validator , ValidatorResult , update_role_validator , delete_role_validator} = require("../../validation/role.validator");



router.post('/add-role', add_role_validator ,  ValidatorResult, adminAuthenticate ,  add_role);
router.get('/get-all_role' , search_all_role)
router.put('/update-role/:roleId' ,update_role_validator , ValidatorResult , adminAuthenticate, update_role)
router.delete('/delete-role/:roleId' , delete_role_validator , ValidatorResult , adminAuthenticate, update_role)


module.exports = router;
