const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authenticate');
const adminAuthenticate = require('../../middleware/admin.authenticate');
const { create_leave, get_all_leave, update_leave } = require('../controllers/leave.controller');
const {leave_validator , ValidatorResult , update_leave_validator} = require("../../validation/leave.validator")


router.post('/apply_Leave', leave_validator , ValidatorResult, authenticate, create_leave);
router.get('/get_all_leave'  , get_all_leave)
router.put('/update_leave_status' , update_leave_validator, ValidatorResult, update_leave)


module.exports = router;