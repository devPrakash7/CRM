
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



exports.add_department = async (req, res) => {

    try {

        const reqBody = req.body;
        const bearerToken = req.headers.authorization;

        if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: Bearer token missing or invalid' });
        }
        const token = bearerToken.replace('Bearer ', '');
        const decoded = jwt.verify(token, JWT_SECRET);
        const checkAdmin = await User.findById(decoded._id);
        if (checkAdmin.user_type !== 1)
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'DEPARTMENT.check_for_admin', {}, req.headers.lang);
        const exist_departmentName = await Department.findOne({ departmentName: reqBody.departmentName })
        if (exist_departmentName)
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'DEPARTMENT.department_name_already_exist', {}, req.headers.lang);
        reqBody.created_at = dateFormat.set_current_timestamp();
        reqBody.updated_at = dateFormat.set_current_timestamp();
        const department = await Departmentsave(reqBody)
        return sendResponse(res, constants.WEB_STATUS_CODE.CREATED, constants.STATUS_CODE.SUCCESS, 'DEPARTMENT.add_department', department, req.headers.lang);

    } catch (err) {
        console.log("Error(add_department)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }

}


exports.get_all_departments = async (req, res) => {

    try {

        const departments = await Department.find({}, { departmentName: 1, description: 1, status: 1 });
        if (!departments)
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'DEPARTMENT.department data found', departments, req.headers.lang);

        return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'DEPARTMENT.list_of_departments', departments, req.headers.lang);

    } catch (err) {
        console.log("Error(get_all_department)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}


exports.get_department = async (req, res) => {

    try {

        let { departmentName } = req.query;
        const departments = await Department.findOne({ departmentName });
        if (!departments)
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'DEPARTMENT.department data found', departments, req.headers.lang);

        return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'DEPARTMENT.list_of_departments', departments, req.headers.lang);

    } catch (err) {
        console.log("Error(get_department)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}


exports.department_status = async (req , res) => {

    try {

        let { departmentId } = req.query;
        const departments = await Department.findOneAndUpdate({_id: departmentId } , {$set: {status: constants.DEPARTMENT_STATUS[0]}});
        if (!departments)
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'DEPARTMENT.department data found', departments, req.headers.lang);

        return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'DEPARTMENT.department_status_updated', departments, req.headers.lang);

    } catch (err) {
        console.log("Error(get_department)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }

}

exports.update_department = async (req , res) => {
    
    try {

        let { departmentId } = req.query;
        
        const bearerToken = req.headers.authorization;

        if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: Bearer token missing or invalid' });
        }
        const token = bearerToken.replace('Bearer ', '');
        const decoded = jwt.verify(token, JWT_SECRET);
        const checkAdmin = await User.findById(decoded._id);
        if (checkAdmin.user_type !== 1)
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'DEPARTMENT.check_for_admin', {}, req.headers.lang);
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
        const token = bearerToken.replace('Bearer ', '');
        const decoded = jwt.verify(token, JWT_SECRET);
        const checkAdmin = await User.findById(decoded._id);
        if (checkAdmin.user_type !== 1)
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'DEPARTMENT.check_for_admin', {}, req.headers.lang);
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