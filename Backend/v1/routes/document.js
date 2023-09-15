const express = require('express');
const router = express.Router();
const adminAuthenticate = require('../../middleware/admin.authenticate');
const { add_documents_validator , ValidatorResult} = require('../../validation/documents.validator');
const {upload}  = require('../../middleware/multer');
const { upload_document, get_all_document, update_documents, delete_documents } = require('../controllers/document.controller');



router.post('/add_documents', upload.single('file'), add_documents_validator, ValidatorResult , adminAuthenticate , upload_document);
router.get('/get_all_documents' , get_all_document)
router.put('/update_documents', upload.single('file'), adminAuthenticate, update_documents)
router.delete('/delete_documents' , delete_documents)

module.exports = router;
