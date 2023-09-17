
const {
    sendResponse
} = require('../../services/common.service')
const dateFormat = require('../../helper/dateformat.helper');
const constants = require('../../config/constants')
const documents = require("../../models/DocumentsUploaded.model")
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../../keys/development.keys')
const User = require("../../models/user.model")
const {admin_check_function}  = require('../../middleware/admin.check.function')



exports.upload_document = async (req , res ) => {

try {

    const reqBody = req.body;
    const employeeId = req.user._id;
    const bearerToken = req.headers.authorization;

    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Bearer token missing or invalid' });
    }
   admin_check_function(bearerToken);

    if(!employeeId)
    return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'DOCUMENTS.not_found', {}, req.headers.lang);
    
    if (!req.file) 
    return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'DOCUMENTS.no_documents_upload', {}, req.headers.lang);
    
    let url = `https//www.livoso.ae/assets/uploasds/${req.file.filename}`;
    reqBody.employeeId = employeeId;
    reqBody.document_url = url
    reqBody.upload_date = dateFormat.set_current_timestamp();
    reqBody.updated_at = dateFormat.set_current_timestamp()
    const leave = await documents.create(reqBody);

    return sendResponse(res, constants.WEB_STATUS_CODE.CREATED, constants.STATUS_CODE.SUCCESS, 'DOCUMENTS.add_documents', leave , req.headers.lang);

} catch (err) {
    console.log("Error(upload_document)", err)
    return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
}

}



exports.get_all_document = async (req, res) => {

    try {
      // Parse query parameters for pagination
      const page = parseInt(req.query.page) || 1; // Current page number (default to 1)
      const pageSize = parseInt(req.query.pageSize) || 10; // Number of items per page (default to 10)
  
      const skip = (page - 1) * pageSize;
  
      // Parse query parameters for sorting
      const sortField = req.query.sortField || '_id'; // Default to sorting by '_id'
      const sortOrder = req.query.sortOrder || 'asc'; // Default to ascending order
  
      // Create a sorting order object based on the sortOrder parameter
      const sortOptions = {};
      sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;
  
      // Use Mongoose's `find` method to retrieve paginated and sorted data
      const document = await documents
        .find()
        .populate('employeeId', 'email mobileNumber firstName lastName')
        .skip(skip)
        .limit(pageSize)
        .sort(sortOptions);
  
      if (!documents || documents.length === 0) {
        return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'DOCUMENTS.not_found', {}, req.headers.lang);
      }
  
      return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'DOCUMENTS.get_document', document, req.headers.lang);
    } catch (err) {
      console.error("Error(get_all_document)", err);
      return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang);
    }
  };
  


exports.update_documents = async (req , res ) => {

    try {
        
        const { documentId } = req.query;
        const bearerToken = req.headers.authorization;

        if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: Bearer token missing or invalid' });
        }
        admin_check_function(bearerToken);

        if (!req.file) 
        return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'DOCUMENTS.no_documents_upload', {}, req.headers.lang);
        
        let url = `https//www.livoso.ae/assets/uploasds/${req.file.filename}`;

         await documents.findOneAndUpdate({ _id: documentId }, {$set:{ document_url: url }}, {new:true});
        await documents.findOneAndUpdate({_id:documentId}, req.body, {new:true});

        req.body.updated_at = await dateFormat.set_current_timestamp()
        return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'DOCUMENTS.update_documents', {} , req.headers.lang);
    
    } catch (err) {
        console.log("Error(update_documents)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
    
    }

exports.delete_documents = async (req , res ) => {

    try {
    
        const { documentId } = req.query;
        const bearerToken = req.headers.authorization;
        if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: Bearer token missing or invalid' });
        }
        admin_check_function(bearerToken);
         await documents.findOneAndDelete({ _id: documentId });
        return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'DOCUMENTS.delete_documents', {} , req.headers.lang);
    
    } catch (err) {-
        console.log("Error(delete_documents)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
    
    }

