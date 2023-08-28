const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authenticate');
const adminAuthenticate = require('../../middleware/admin.authenticate');
const { add_department, get_all_departments, get_department, update_department, delete_department, department_status } = require('../controllers/department.controller');



router.post('/add_department', adminAuthenticate, add_department);
router.get('/search_all_departments', get_all_departments)
router.get('/search_department', get_department)
router.put('/update_department', adminAuthenticate, update_department)
router.delete('/delete_department', adminAuthenticate, delete_department)
router.put('/department_status_updated' , department_status)



module.exports = router;