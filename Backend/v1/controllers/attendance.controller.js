const jwt = require('jsonwebtoken')
const {
    sendResponse
} = require('../../services/common.service')
const dateFormat = require('../../helper/dateformat.helper');
const constants = require('../../config/constants')
const {
    JWT_SECRET
} = require('../../keys/keys');
const attendance = require("../../models/attendance.model")
const User = require('../../models/user.model')




exports.mark_attendance = async (req , res ) => {

try {

    const reqBody = req.body;
    const bearerToken = req.headers.authorization;
    const employee = req.user;

    if(employee)
    return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'ATTENDANCE.not_found', {}, req.headers.lang);

    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Bearer token missing or invalid' });
    }
    const token = bearerToken.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET);
    const checkAdmin = await User.findById(decoded._id);
    if (checkAdmin.user_type !== 1)
        return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'ATTENDANCE.check_for_admin', {}, req.headers.lang);
     reqBody.employeeId  = employee._id;
    const attendances = await attendance.create(reqBody);
    return sendResponse(res, constants.WEB_STATUS_CODE.CREATED, constants.STATUS_CODE.SUCCESS, 'ATTENDANCE.mark_attendance', attendances , req.headers.lang);


} catch (err) {
    console.log("Error(mark_attendance)", err)
    return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
}

}


exports.get_attendance = async (req , res) => {

    try {

        const attendanceId = req.query.attendanceId;
        // Check if the user exists
        const user = await attendance.find({_id:attendanceId}).populate('employeeId' , 'mobileNumber email firstName lastName')

        if (!user) 
        return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'ATTENDANCE.employee_not_found', {} , req.headers.lang);
    
        return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'ATTENDANCE.get_employee_attendance', user , req.headers.lang);
    
    } catch (err) {
        console.log("Error(get_attendance)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}


exports.update_attendance_status = async (req , res) => {

    try {

        const attendanceId = req.query.attendanceId;
        // Check if the user exists
        const user = await attendance.findOneand({_id:attendanceId}).populate('employeeId' , 'mobileNumber email firstName lastName')

        if (!user) 
        return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'ATTENDANCE.employee_not_found', {} , req.headers.lang);
    
        return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'ATTENDANCE.get_employee_attendance', user , req.headers.lang);
    
    } catch (err) {
        console.log("Error(get_attendance)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}