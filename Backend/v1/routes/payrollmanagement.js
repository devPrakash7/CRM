const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authenticate');
const adminAuthenticate = require('../../middleware/admin.authenticate');
const { add_payroll, geta_all_payroll, update_payroll } = require('../controllers/payrollmanagement');


router.post('/add_payroll' , adminAuthenticate, add_payroll)
router.get('/get_all_payrolls' , geta_all_payroll)
router.put('/update_payroll' , adminAuthenticate , update_payroll)


module.exports = router;