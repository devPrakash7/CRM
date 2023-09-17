
const jwt = require('jsonwebtoken');
const {
    sendResponse
} = require('../../services/common.service')
const dateFormat = require('../../helper/dateformat.helper');
const User = require('../../models/user.model')
const { Departmentsave } = require('../services/department.service');
const constants = require('../../config/constants')
const {
    JWT_SECRET
} = require('../../keys/keys');
const Department = require("../../models/department.model")
const { admin_check_function }  = require('../../middleware/admin.check.function')




exports.add_department = async (req, res) => {

    try {

        const reqBody = req.body;
        const bearerToken = req.headers.authorization;
        const employee = req.user._id;

        if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: Bearer token missing or invalid' });
        }

       admin_check_function(bearerToken);

        const exist_departmentName = await Department.findOne({ departmentName: reqBody.departmentName })
        if (exist_departmentName)
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'DEPARTMENT.department_name_already_exist', {}, req.headers.lang);
        reqBody.created_at = dateFormat.set_current_timestamp();
        reqBody.updated_at = dateFormat.set_current_timestamp();
        reqBody.employeeId = employee;
        const department = await Departmentsave(reqBody)
        return sendResponse(res, constants.WEB_STATUS_CODE.CREATED, constants.STATUS_CODE.SUCCESS, 'DEPARTMENT.add_department', department, req.headers.lang);

    } catch (err) {
        console.log("Error(add_department)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }

}


exports.get_all_departments = async (req, res) => {

    try {
      // Parse query parameters for pagination
      const page = parseInt(req.query.page) || 1; // Current page number (default to 1)
      const pageSize = parseInt(req.query.pageSize) || 10; // Number of items per page (default to 10)
  
      const skip = (page - 1) * pageSize;
  
      // Parse query parameters for sorting
      const sortField = req.query.sortField || 'name'; // Default to sorting by 'name'
      const sortOrder = req.query.sortOrder || 'asc'; // Default to ascending order
  
      // Create a sorting order object based on the sortOrder parameter
      const sortOptions = {};
      sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;
  
      // Use Mongoose's `find` method to retrieve paginated and sorted data
      const departments = await Department
        .find({}, { name: 1, description: 1, location: 1, isActive: 1, head: 1 })
        .populate('employeeId', 'firstName lastName age gender email')
        .skip(skip)
        .limit(pageSize)
        .sort(sortOptions);
  
      if (!departments || departments.length === 0) {
        return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'DEPARTMENT.department_data_not_found', {}, req.headers.lang);
      }
  
      return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'DEPARTMENT.list_of_departments', departments, req.headers.lang);
    } catch (err) {
      console.error("Error(get_all_departments)", err);
      return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang);
    }
  };
  


exports.get_department = async (req, res) => {
    
    try {
      // Parse query parameters for pagination
      const page = parseInt(req.query.page) || 1; // Current page number (default to 1)
      const pageSize = parseInt(req.query.pageSize) || 10; // Number of items per page (default to 10)
  
      const skip = (page - 1) * pageSize;
  
      // Parse query parameters for filtering (example: name)
      const filterCriteria = {};
      if (req.query.departmentName) {
        filterCriteria.departmentName = req.query.departmentName;
      }
  
      // Parse query parameters for sorting
      const sortField = req.query.sortField || '_id'; // Default to sorting by '_id'
      const sortOrder = req.query.sortOrder || 'asc'; // Default to ascending order
  
      // Create a sorting order object based on the sortOrder parameter
      const sortOptions = {};
      sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;
  
      // Use Mongoose's `find` method to retrieve paginated, filtered, and sorted data
      const departments = await Department
        .find(filterCriteria)
        .populate('employeeId', 'firstName lastName age gender email')
        .skip(skip)
        .limit(pageSize)
        .sort(sortOptions);
  
      if (!departments || departments.length === 0) {
        return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'DEPARTMENT.department_data_not_found', {}, req.headers.lang);
      }
  
      return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'DEPARTMENT.list_of_departments', departments, req.headers.lang);
    } catch (err) {
      console.error("Error(get_department)", err);
      return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang);
    }
  };
  

exports.department_status = async (req , res) => {

    try {

        let { departmentId } = req.query;
        const bearerToken = req.headers.authorization;
        if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: Bearer token missing or invalid' });
        }
        admin_check_function(bearerToken);
        const departments = await Department.findOneAndUpdate({_id: departmentId } , {$set: {status: constants.DEPARTMENT_STATUS[0]}});
        if (!departments)
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'DEPARTMENT.department data found', {}, req.headers.lang);

        return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'DEPARTMENT.department_status_updated', departments, req.headers.lang);

    } catch (err) {
        console.log("Error(department_status)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }

}

exports.update_department = async (req , res) => {
    
    try {

        let { departmentId } = req.query;
        const bearerToken = req.headers.authorization;
        if (!bearerToken || !bearerToken.startsWith('Bearer ')) 
            return res.status(401).json({ message: 'Unauthorized: Bearer token missing or invalid' });

        admin_check_function(bearerToken);
        const departments = await Department.findOneAndUpdate({ _id: departmentId} , req.body , {new:true})
        if (!departments)
        return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'DEPARTMENT.department data found', departments, req.headers.lang);

        departments.updated_at = dateFormat.set_current_timestamp();
        await departments.save();
       
        return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'DEPARTMENT.update_department', departments, req.headers.lang);

    } catch (err) {
        console.log("Error(update_department)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }

}


exports.delete_department = async (req , res) => {
    
    try {

        let { departmentId } = req.query;
        const bearerToken = req.headers.authorization;

        if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: Bearer token missing or invalid' });
        }
        admin_check_function(bearerToken)
        const departments = await Department.findByIdAndDelete(departmentId)
      
        if (!departments)
        return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'DEPARTMENT.department_data_found', departments, req.headers.lang);

        departments.deleted_at = dateFormat.set_current_timestamp();
        await departments.save();
       
        return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'DEPARTMENT.delete_department', departments, req.headers.lang);

    } catch (err) {
        console.log("Error(delete_department)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }

}