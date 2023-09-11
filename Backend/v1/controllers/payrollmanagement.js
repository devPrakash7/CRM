
const {
    sendResponse
} = require('../../services/common.service')
const dateFormat = require('../../helper/dateformat.helper');
const Payrollmanagement = require('../../models/Payrollmanagement.model')
const User = require('../../models/user.model')
const constants = require('../../config/constants')
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../keys/keys');
const { calculateBonuses, calculateTax, calculateInsurance } = require('../../middleware/taxcalculated')



exports.add_payroll = async (req, res) => {

    try {

        const { employeeId, salary, payroll_period, deductions, bonuses, description } = req.body;
        const bearerToken = req.headers.authorization;

        if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: Bearer token missing or invalid' });
        }
        const token = bearerToken.replace('Bearer ', '');
        const decoded = jwt.verify(token, JWT_SECRET);
        const checkAdmin = await User.findById(decoded._id);
        if (checkAdmin.user_type !== 1)
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'USER.check_for_admin', {}, req.headers.lang);

        // Sample calculation logic (replace with your actual calculation logic)
        const tax = calculateTax(salary); // Replace with your tax calculation function
        const insurance = calculateInsurance(salary); // Replace with your insurance calculation function
        const totalEarnings = salary + calculateBonuses(bonuses); // Replace with your bonus calculation function
        const totalDeductions = tax + insurance; // Combine deductions
        const netPay = totalEarnings - totalDeductions;

        // Create a new payroll record
        const newPayroll = new Payrollmanagement({
            employeeId,
            salary,
            payroll_period,
            deductions: { tax, insurance },
            total_earnings: totalEarnings,
            total_deductions: totalDeductions,
            net_pay: netPay,
            description,
            bonuses,
        });

        await newPayroll.save();
        return sendResponse(res, constants.WEB_STATUS_CODE.CREATED, constants.STATUS_CODE.SUCCESS, 'PAYROLL.add_payroll', newPayroll, req.headers.lang);

    } catch (err) {
        console.log("err(add_payroll)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}



exports.geta_all_payroll = async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1; // Current page
        const limit = parseInt(req.query.limit) || 10; // Records per page

        const filters = {};

        if (req.query.employeeId) {
            filters.employeeId = req.query.employeeId;
        }

        const totalRecords = await Payrollmanagement.countDocuments(filters);

        const payrollRecords = await Payrollmanagement.find(filters)
            .populate('employeeId' , 'firstName lastName email jobTitle')
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
    
        return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'PAYROLL.get_all_payroll', {
            data: payrollRecords,
            page,
            limit,
            totalRecords,
        }, req.headers.lang);

    } catch (err) {
        console.log("err(geta_all_payroll)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}


exports.update_payroll = async (req, res) => {

    try {
      
        const { payrollId } = req.query;
        const bearerToken = req.headers.authorization;

        if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: Bearer token missing or invalid' });
        }
        const token = bearerToken.replace('Bearer ', '');
        const decoded = jwt.verify(token, JWT_SECRET);
        const checkAdmin = await User.findById(decoded._id);
        if (checkAdmin.user_type !== 1)
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'USER.check_for_admin', {}, req.headers.lang);

        const payrolls = await Payrollmanagement.findOneAndUpdate({_id: payrollId },{$set:{ status: "success" }} ,{ new:true });

        return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'PAYROLL.update_payroll', payrolls , req.headers.lang);

    } catch (err) {
        console.log("err(update_payroll)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}
