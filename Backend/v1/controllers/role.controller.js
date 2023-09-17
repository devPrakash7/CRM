
const {
    sendResponse
} = require('../../services/common.service')
const dateFormat = require('../../helper/dateformat.helper');
const rolemanagement = require('../../models/rolemanagement.model')
const User = require('../../models/user.model')
const constants = require('../../config/constants')
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../keys/keys');
const {
    isValid
} = require('../../services/blackListMail')
const {admin_check_function} = require('../../middleware/admin.check.function')


exports.add_role = async (req, res) => {

    try {

        const reqBody = req.body
        const bearerToken = req.headers.authorization;

        if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: Bearer token missing or invalid' });
        }
        admin_check_function(bearerToken)

        const checkMail = await isValid(reqBody.email)
        if (checkMail == false) return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'GENERAL.blackList_mail', {}, req.headers.lang);

        reqBody.created_at = await dateFormat.set_current_timestamp();
        reqBody.updated_at = await dateFormat.set_current_timestamp();

        const role = await rolemanagement.create(reqBody)
 
       return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'ROLE.add_role', role , req.headers.lang);

    } catch (err) {
        console.log("err........", err)
       return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}


exports.search_all_role = async (req, res, next) => {
    
    try {
      // Parse query parameters for pagination
      const page = parseInt(req.query.page) || 1; // Current page number (default to 1)
      const pageSize = parseInt(req.query.pageSize) || 10; // Number of items per page (default to 10)
  
      const skip = (page - 1) * pageSize;
  
      // Parse query parameter for sorting
      const sortField = req.query.sortField || '_id'; // Default to sorting by '_id'
      const sortOrder = req.query.sortOrder || 'asc'; // Default to ascending order
  
      // Create a sorting order object based on the sortOrder parameter
      const sortOptions = {};
      sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;
  
      // Use Mongoose's `find` method to retrieve paginated and sorted data
      const roles = await rolemanagement
        .find({}, { updated_at: 0, _id: 0, __v: 0 })
        .skip(skip)
        .limit(pageSize)
        .sort(sortOptions);
  
      return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'ROLE.get_role', roles, req.headers.lang);
    } catch (err) {
      console.error(err);
      return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang);
    }
  };

  
  
exports.update_role = async (req, res) => {

    try {
       
        const { roleId } = req.params;
        const reqBody = req.body
        const bearerToken = req.headers.authorization;
        if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: Bearer token missing or invalid' });
        }
        admin_check_function(bearerToken)
        reqBody.updated_at = await dateFormat.set_current_timestamp();
        const role = await rolemanagement.findOneandUpdate({_id : roleId } , reqBody , { new:true })
       return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'ROLE.update_role', role , req.headers.lang);

    } catch (err) {
        console.log("err........", err)
       return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}


exports.delete_role = async (req, res) => {

    try {
       
        const { roleId } = req.params;
        const reqBody = req.body
        const bearerToken = req.headers.authorization;

        if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: Bearer token missing or invalid' });
        }
        admin_check_function(bearerToken)
        const role = await rolemanagement.findOneandDelete({_id : roleId })
 
       return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'ROLE.delete_role', role , req.headers.lang);

    } catch (err) {
        console.log("err........", err)
       return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}
