
const User = require('../models/user.model');
const {
        sendResponse
    } = require('../services/common.service')



exports.Role_checked_by_admin_and_manager = async (adminId , managerId) => {

  try{
        const role = await User.findOne({_id: adminId});
        const roles = await User.findOne({_id: managerId});

        if(role.user_type !== 1 && roles.user_type !== 2){

           return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'WORK.check_admin', {} , req.headers.lang)
        }

  }catch(err){

     console.log("Error(Role_checked_by_admin_and_manager)", err)
     return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
  }
        
}