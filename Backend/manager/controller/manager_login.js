
const { sendResponse } = require('../../services/common.service')
const constants = require('../../config/constants');
const User = require('../../models/user.model');




exports.login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email, deleted_at: null });

        if (!user) {
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'USER.invalid_username_password', {}, req.headers.lang);
        }
        if (!user.validPassword(password)) {
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'USER.invalid_username_password', {}, req.headers.lang);
        }
        if (user.user_type !== constants.USER_TYPE.MANAGER) {
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'GENERAL.unauthorized_user', {}, req.headers.lang);
        }

        await user.generateAuthToken();
        await user.generateRefreshToken();

        sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'USER.manager_login_success', user, req.headers.lang);
    } catch (err) {
        console.log("err........", err)
        sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}



exports.logout = async (req, res) => {

    try {

        const reqBody = req.user
        console.log(reqBody)
        let UserData = await User.findById(reqBody._id)
        UserData.tokens = null
        UserData.refresh_tokens = null
        await UserData.save()
        
        sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'USER.manager_logout_success', {}, req.headers.lang);
    } catch (err) {
        console.log("err........", err)
        sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}

