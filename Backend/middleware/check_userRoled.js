const constants = require("../config/constants");
const { sendResponse } = require('../services/common.service')

const isAdmin = (req, res, next) => {
    const userRole = req.user; 
    console.log(userRole)// Assuming you have a way to determine the user's role (e.g., from JWT or session)
    if (userRole.user_type === "ADMIN") {
        // User is an admin, continue to the next middleware
        next();
    } else {
        // User is not an admin, return an unauthorized response
        return sendResponse(res, constants.WEB_STATUS_CODE.UNAUTHORIZED, constants.STATUS_CODE.FAIL, 'Only admin can update employee data', null, req.headers.lang);
    }
};


module.exports = isAdmin;





