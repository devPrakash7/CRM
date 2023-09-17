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
const { admin_check_function } = require('../../middleware/admin.check.function')



exports.add_menu = async (req, res) => {

    try {

        const reqBody = req.body;
        const bearerToken = req.headers.authorization;
        if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: Bearer token missing or invalid' });
        }
        admin_check_function(bearerToken)
        reqBody.created_at = await dateFormat.set_current_timestamp();
        reqBody.updated_at = await dateFormat.set_current_timestamp();
        const menus = await menu.create(reqBody)
        return sendResponse(res, constants.WEB_STATUS_CODE.CREATED, constants.STATUS_CODE.SUCCESS, 'MENU.add_menu', menus, req.headers.lang);

    } catch (err) {
        console.log("Error(add_menu)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }

}

exports.get_menu = async (req, res) => {

    try {

        // Parse query parameters for pagination
        const page = parseInt(req.query.page) || 1; // Current page number (default to 1)
        const pageSize = parseInt(req.query.pageSize) || 10; // Number of items per page (default to 10)

        const skip = (page - 1) * pageSize;

        // Parse query parameters for sorting
        const sortField = req.query.sortField || '_id'; // Default to sorting by '_id'
        const sortOrder = req.query.sortOrder || 'asc'; // Default to ascending order

        // Create a sorting order object based on the sortOrder parameter
        const sortOptions = {};
        sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;

        // Use Mongoose's `find` method to retrieve paginated and sorted data
        const menus = await menu
            .find()
            .skip(skip)
            .limit(pageSize)
            .sort(sortOptions);

        return sendResponse(res, constants.WEB_STATUS_CODE.CREATED, constants.STATUS_CODE.SUCCESS, 'MENU.get_menu', menus, req.headers.lang);
    } catch (err) {
        console.error("Error(get_menu)", err);
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang);
    }
};



exports.update_menu = async (req, res) => {

    try {

        const updateData = req.body;
        const menuItemId = req.params.id;
        const bearerToken = req.headers.authorization;
        if (!bearerToken || !bearerToken.startsWith('Bearer '))
            return res.status(401).json({ message: 'Unauthorized: Bearer token missing or invalid' });

        admin_check_function(bearerToken)
        updateData.updated_at = await dateFormat.set_current_timestamp();
        const updatedMenuItem = await menu.findByIdAndUpdate(menuItemId, updateData, { new: true });

        if (!updatedMenuItem)
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'MENU.not_found', {}, req.headers.lang);

        return sendResponse(res, constants.WEB_STATUS_CODE.CREATED, constants.STATUS_CODE.SUCCESS, 'MENU.update_menu', updatedMenuItem, req.headers.lang);

    } catch (err) {
        console.log("Error(update_menu)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }

}
