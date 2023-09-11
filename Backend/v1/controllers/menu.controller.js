const jwt = require('jsonwebtoken')
const {
    sendResponse
} = require('../../services/common.service')
const dateFormat = require('../../helper/dateformat.helper');
const constants = require('../../config/constants')
const {
    JWT_SECRET
} = require('../../keys/keys');
const menu = require("../../models/menu.model")
const User = require('../../models/user.model')




exports.add_menu = async (req , res ) => {

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
        return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'USER.check_for_admin', {}, req.headers.lang);
        reqBody.created_at = await dateFormat.set_current_timestamp();
        reqBody.updated_at = await dateFormat.set_current_timestamp();
      const menus = await menu.create(reqBody)
      return sendResponse(res, constants.WEB_STATUS_CODE.CREATED, constants.STATUS_CODE.SUCCESS, 'MENU.add_menu', menus , req.headers.lang);

} catch (err) {
    console.log("Error(add_menu)", err)
    return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
}

}

exports.get_menu = async (req , res ) => {

    try {
          const menus = await menu.find()
          return sendResponse(res, constants.WEB_STATUS_CODE.CREATED, constants.STATUS_CODE.SUCCESS, 'MENU.get_menu', menus , req.headers.lang);
    
    } catch (err) {
        console.log("Error(get_menu)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
    
    }
    
    
    exports.update_menu = async (req , res ) => {

        try {
        
            const updateData = req.body;
            const menuItemId = req.params.id;
            const bearerToken = req.headers.authorization;
            if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Unauthorized: Bearer token missing or invalid' });
            }
            const token = bearerToken.replace('Bearer ', '');
            const decoded = jwt.verify(token, JWT_SECRET);
            const checkAdmin = await User.findById(decoded._id);
            if (checkAdmin.user_type !== 1)
                return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'USER.check_for_admin', {}, req.headers.lang);
                updateData.updated_at = await dateFormat.set_current_timestamp();
                const updatedMenuItem = await menu.findByIdAndUpdate(menuItemId, updateData, { new: true });

                if(!updatedMenuItem)
                return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'MENU.not_found', {}, req.headers.lang);
              
              return sendResponse(res, constants.WEB_STATUS_CODE.CREATED, constants.STATUS_CODE.SUCCESS, 'MENU.update_menu', updatedMenuItem , req.headers.lang);
        
        } catch (err) {
            console.log("Error(update_menu)", err)
            return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
        }
        
        }
        