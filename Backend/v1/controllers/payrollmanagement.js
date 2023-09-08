
const {
    sendResponse
} = require('../../services/common.service')
const dateFormat = require('../../helper/dateformat.helper');
const Payrollmanagement = require('../../models/Payrollmanagement.model')
const User = require('../../models/user.model')
const constants = require('../../config/constants')
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../keys/keys');
const {
    isValid
} = require('../../services/blackListMail')
const { calculateIncomeTax } = require('../../middleware/taxcalculated')


exports.add_role = async (req, res) => {

    try {

        const reqBody = req.body
        const bearerToken = req.headers.authorization;
        const user = req.user._id;

        if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: Bearer token missing or invalid' });
        }
        const token = bearerToken.replace('Bearer ', '');
        const decoded = jwt.verify(token, JWT_SECRET);
        const checkAdmin = await User.findById(decoded._id);
        if (checkAdmin.user_type !== 1)
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'USER.check_for_admin', {}, req.headers.lang);
        
        const totalEarnings = reqBody.salary + bonuses.reduce((total, bonus) => total + bonus.amount, 0);
        reqBody.deductions.tax = calculateIncomeTax(reqBody.salary)
        const totalDeductions = deductions.tax + deductions.insurance;
        reqBody.deductions.insurance = 200;
        reqBody.total_earnings = totalEarnings;
        reqBody.total_deductions = totalDeductions;
    
        const role = await Payrollmanagement.create(reqBody)
 
       return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'ROLE.add_role', role , req.headers.lang);

    } catch (err) {
        console.log("err........", err)
       return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}
