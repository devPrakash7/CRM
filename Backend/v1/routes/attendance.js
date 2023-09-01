const express = require('express');
const router = express.Router();
const adminAuthenticate = require('../../middleware/admin.authenticate');
const { mark_attendance, get_attendance } = require('../controllers/attendance.controller');




router.post('/mark-attendance', adminAuthenticate ,  mark_attendance);
router.get('/get-attendance' , get_attendance)

module.exports = router;
