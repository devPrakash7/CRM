const express = require('express');
const router = express.Router();
const adminAuthenticate = require('../../middleware/admin.authenticate');
const { mark_attendance, get_attendance, update_attendance_status } = require('../controllers/attendance.controller');




router.post('/mark-attendance', adminAuthenticate ,  mark_attendance);
router.get('/get-attendance' , get_attendance)
router.put('/update-attendance' , update_attendance_status)

module.exports = router;
