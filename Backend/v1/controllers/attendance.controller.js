const jwt = require('jsonwebtoken')
const {
    sendResponse
} = require('../../services/common.service')
const dateFormat = require('../../helper/dateformat.helper');
const constants = require('../../config/constants')
const attendance = require("../../models/attendance.model")
const User = require('../../models/user.model')
const { admin_check_function }  = require('../../middleware/admin.check.function')



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
    admin_check_function(bearerToken);
     reqBody.employeeId  = employee._id;
    const attendances = await attendance.create(reqBody);
    return sendResponse(res, constants.WEB_STATUS_CODE.CREATED, constants.STATUS_CODE.SUCCESS, 'ATTENDANCE.mark_attendance', attendances , req.headers.lang);

} catch (err) {
    console.log("Error(mark_attendance)", err)
    return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
}

}


exports.get_attendance = async (req, res) => {
    try {
     
      // Parse query parameters for pagination
      const page = parseInt(req.query.page) || 1; // Current page number (default to 1)
      const pageSize = parseInt(req.query.pageSize) || 10; // Number of items per page (default to 10)
      const skip = (page - 1) * pageSize;
  
      // Use Mongoose's `find` method to retrieve paginated data based on attendanceId
      const query = attendance
        .find()
        .populate('employeeId', 'mobileNumber email firstName lastName')
        .skip(skip)
        .limit(pageSize);
  
      const user = await query.exec();
  
      if (!user || user.length === 0) {
        return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'ATTENDANCE.employee_not_found', {}, req.headers.lang);
      }
  
      return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'ATTENDANCE.get_employee_attendance', user, req.headers.lang);
    } catch (err) {
      console.error("Error(get_attendance)", err);
      return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang);
    }
  };
  

  
exports.update_attendance_status = async (req , res) => {

    try {

        const attendanceId = req.query.attendanceId;
        const bearerToken = req.headers.authorization;

        if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: Bearer token missing or invalid' });
        }
        admin_check_function(bearerToken);
        const user = await attendance.findOneandUpdate({_id: attendanceId }).populate('employeeId' , 'mobileNumber email firstName lastName')
        if (!user) 
        return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'ATTENDANCE.employee_not_found', {} , req.headers.lang);
    
        return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'ATTENDANCE.get_employee_attendance', user , req.headers.lang);
    
    } catch (err) {
        console.log("Error(update_attendance_status)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}