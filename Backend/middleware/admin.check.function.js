const User = require('../models/user.model');
const {
    sendResponse
} = require('../services/common.service')
const {
    JWT_SECRET
} = require('../keys/keys');
const jwt = require('jsonwebtoken')



exports.admin_check_function = async ( bearerToken ) => {

try {
    
    const token = bearerToken.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded)
    const checkAdmin = await User.findById(decoded._id);
    console.log(checkAdmin)

    if (checkAdmin.user_type !== 1)
    return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'USER.check_for_admin', {} , req.headers.lang);

  }catch(err) {

     console.log("error(admin_check_function)")
     console.log(err.message)
  }
}