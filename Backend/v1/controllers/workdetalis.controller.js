
const {
    sendResponse
} = require('../../services/common.service')
const dateFormat = require('../../helper/dateformat.helper');
const constants = require('../../config/constants')
const WorkDetails = require("../../models/WorkDetails.model")
const { Role_checked_by_admin_and_manager } = require('../../middleware/role_checked')
const User = require('../../models/user.model')



exports.add_work_detalis = async (req, res) => {

    try {

        const { adminId, managerId } = req.query;
        Role_checked_by_admin_and_manager(adminId, managerId);
        const assignedEmployees = req.body.assigned_to;

        if (!Array.isArray(assignedEmployees) || assignedEmployees.length === 0)
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'WORK.check_is_array', {}, req.headers.lang);

        const newWorkDetail = new WorkDetails({
            task_name: req.body.task_name,
            assigned_to: assignedEmployees,
            comments: req.body.comments,
            priority: req.body.priority,
            assigned_by: req.body.assigned_by,
            description: req.body.description,
            end_date: req.body.end_date
        });

        let data = await newWorkDetail.save();
        return sendResponse(res, constants.WEB_STATUS_CODE.CREATED, constants.STATUS_CODE.SUCCESS, 'WORK.add_work', data, req.headers.lang);

    } catch (err) {
        console.log("Error(add_work_detalis)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }

}



exports.get_all_work_detalis = async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const filterCriteria = req.query.filter ? JSON.parse(req.query.filter) : {};

        // Calculate skip value for pagination
        const skip = (page - 1) * pageSize;
        const works = await WorkDetails.find(filterCriteria)
            .populate('assigned_to', 'email firstName lastName jobTitle')
            .skip(skip)
            .limit(pageSize);

        const totalDocuments = await WorkDetails.countDocuments(filterCriteria);

        // Prepare response data with pagination information
        const response = {
            totalDocuments,
            page,
            pageSize,
            works,
        };

        return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'WORK.get_all_work', response, req.headers.lang);

    } catch (err) {
        console.log("Error(get_all_work_detalis)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }

}

exports.update_work_detalis = async (req, res) => {

    try {

        const documentId = req.params.documentId;
        const { adminId, managerId } = req.query;
        Role_checked_by_admin_and_manager(adminId, managerId);

        const updatedData = {
            end_date: dateFormat.set_current_timestamp(), // Updated end_date value
            status: 'completed', // Updated status value
            comments: req.body.comments
        };

        let updateData = await WorkDetails.findByIdAndUpdate(
            documentId,
            { $set: updatedData },
            { new: true },
            (err, updatedDocument) => {
                if (err) {
                    console.error(err);
                    return;
                }

                if (!updatedDocument) {
                    console.error('Document not found.');
                    return;
                }
            })

        return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'WORK.updated_documents', updateData, req.headers.lang);

    } catch (err) {
        console.log("Error(update_work_detalis)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }

}


