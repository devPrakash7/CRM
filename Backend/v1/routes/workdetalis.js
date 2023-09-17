const express = require('express');
const { add_work_detalis, get_all_work_detalis, update_work_detalis } = require('../controllers/workdetalis.controller');
const router = express.Router();
const {add_work_validator , ValidatorResult , update_work_details_validator} = require('../../validation/workdetalis.validator')



router.post('/add_work_detalis', add_work_validator, ValidatorResult, add_work_detalis);
router.get('/get_all_work_detalis' , get_all_work_detalis)
router.put('/update_work/:documentId' , update_work_details_validator , ValidatorResult , update_work_detalis)


module.exports = router;