const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authenticate');
const {
  login, logout, search_employee, update_employee, delete_employee, add_employee, search_all_employee_by_email, get_all_employee, update_role,
} = require('../controllers/user.controller')
const adminAuthenticate = require('../../middleware/admin.authenticate')
const {user_validator , login_validator , search_all_employee_validator, update_employee_validator,delete_employee_validator, update_role_validator, ValidatorResult} = require('../../validation/user.validator');



router.post('/signUp', user_validator ,  ValidatorResult , adminAuthenticate ,  add_employee);
router.post('/login',login_validator ,ValidatorResult, login);
router.get('/logout' , authenticate , logout);
router.get('/search_all_employees' , search_all_employee_validator, ValidatorResult, search_all_employee_by_email)
router.get('/get_all_employee' , get_all_employee)
router.put('/update_role' , update_role_validator , ValidatorResult , adminAuthenticate, update_role)
router.put('/update_employee' , update_employee_validator, ValidatorResult ,adminAuthenticate ,   update_employee)
router.delete('/delete_employee' ,delete_employee_validator, ValidatorResult, adminAuthenticate , delete_employee)



module.exports = router;
