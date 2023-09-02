const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authenticate');
const adminAuthenticate = require('../../middleware/admin.authenticate');
const { add_department, get_all_departments, get_department, update_department, delete_department, department_status } = require('../controllers/department.controller');
const { add_department_validator , ValidatorResult , get_department_validator , update_department_validator , delete_department_validator, department_status_validator} = require('../../validation/department.validator')



router.post('/add_department',add_department_validator, ValidatorResult, adminAuthenticate, add_department);
router.get('/search_all_departments', get_all_departments)
router.get('/search_department',get_department_validator, ValidatorResult, get_department)
router.put('/update_department',update_department_validator , ValidatorResult, adminAuthenticate, update_department)
router.delete('/delete_department',delete_department_validator , ValidatorResult, adminAuthenticate, delete_department)
router.put('/department_status_updated' ,department_status_validator, ValidatorResult, adminAuthenticate , department_status)




module.exports = router;