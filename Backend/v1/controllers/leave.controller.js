
const {
    sendResponse
} = require('../../services/common.service')
const dateFormat = require('../../helper/dateformat.helper');
const constants = require('../../config/constants')
const Leave = require("../../models/leave.model")




exports.create_leave = async (req , res ) => {

try {

    const reqBody = req.body;
    const employeeId = req.user._id;
    console.log(employeeId)
    if(!employeeId)
    return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'LEAVES.employeeId_not_found', {}, req.headers.lang);
    reqBody.employeeId = employeeId;
    const leave = await Leave.create(reqBody);
    return sendResponse(res, constants.WEB_STATUS_CODE.CREATED, constants.STATUS_CODE.SUCCESS, 'LEAVES.create_leave', leave , req.headers.lang);

} catch (err) {
    console.log("Error(create_leave)", err)
    return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
}

}

exports.get_all_leave = async (req , res ) => {

    try {
    
        const leaves = await Leave.find()
        if(!leaves)
        return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'LEAVES.not_found', {}, req.headers.lang);
        return sendResponse(res, constants.WEB_STATUS_CODE.CREATED, constants.STATUS_CODE.SUCCESS, 'LEAVES.get_all_leave', leaves , req.headers.lang);
    
    } catch (err) {
        console.log("Error(get_all_leave)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
    
    }


exports.update_leave = async (req , res ) => {

    try {
        
        const {LeaveId} = req.query;
        const leaves = await Leave.findOneAndUpdate({ _id: LeaveId }, req.body, {new:true});
        if(!leaves)
        return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'LEAVES.not_found', {}, req.headers.lang);
        req.bodt.updated_at = await dateFormat.set_current_timestamp()
        return sendResponse(res, constants.WEB_STATUS_CODE.CREATED, constants.STATUS_CODE.SUCCESS, 'LEAVES.update_leave', leaves , req.headers.lang);
    
    } catch (err) {
        console.log("Error(update_leave)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
    
    }