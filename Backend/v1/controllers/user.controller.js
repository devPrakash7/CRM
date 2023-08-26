const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
    sendResponse
} = require('../../services/common.service')
const dateFormat = require('../../helper/dateformat.helper');
const User = require('../../models/user.model')
const {
    isValid
} = require('../../services/blackListMail')
const {
    getUser,
    Usersave,
    deleteUser
} = require('../services/user.service');
const constants = require('../../config/constants')
const {
    JWT_SECRET,
    BASEURL
} = require('../../keys/keys');




exports.signUp = async (req, res) => {

    try {

        const reqBody = req.body
        console.log(req.body);
        const checkMail = await isValid(reqBody.email)

        if (checkMail == false) return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'GENERAL.blackList_mail', {}, req.headers.lang);

        let existingUser = await getUser(reqBody.email, 'email');

        if (existingUser && existingUser.verify_token == true) {
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'USER.email_already_exist', {}, req.headers.lang);
        }

        if (existingUser && existingUser.verify_token == false) {
            await deleteUser(existingUser._id)
        }

    
        reqBody.password = await bcrypt.hash(reqBody.password, 10);
        reqBody.created_at = await dateFormat.set_current_timestamp();
        reqBody.updated_at = await dateFormat.set_current_timestamp();
        reqBody.tempTokens = await jwt.sign({
            data: reqBody.email
        }, JWT_SECRET, {
            expiresIn: constants.URL_EXPIRE_TIME
        })
       

        const user = await Usersave(reqBody);
        let resData = user

        delete resData.reset_password_token;
        delete resData.reset_password_expires;
        delete resData.first_name;
        delete resData.last_name;
        delete resData.password;
        resData.tokens = ''

        sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'USER.signUp_success', resData, req.headers.lang);

    } catch (err) {
        console.log("err........", err)
        sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}


exports.logout = async (req, res, next) => {

    try {

        const reqBody = req.user
        let UserData = await User.findById(reqBody._id)
        UserData.tokens = null
        UserData.refresh_tokens = null

        await UserData.save()
        sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'USER.logout_success', UserData , req.headers.lang);

    } catch (err) {
        console.log(err)
        sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}


exports.login = async (req, res, next) => {

    try {

        const reqBody = req.body
        console.log("reqBody...", reqBody)
        let user = await User.findByCredentials(reqBody.email, reqBody.password, reqBody.user_type || '3');

        console.log("user...", user)

        if (user == 1) return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'USER.email_not_found', {}, req.headers.lang);
        if (user == 2) return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'USER.invalid_password', {}, req.headers.lang);

        //if (user.verify_token == false) return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'USER.not_verify_account', {}, req.headers.lang);
        if (user.status == 0) return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'USER.inactive_account', {}, req.headers.lang);
        if (user.status == 2) return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'USER.deactive_account', {}, req.headers.lang);
        if (user.deleted_at != null) return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'USER.inactive_account', {}, req.headers.lang);

        let newToken = await user.generateAuthToken();
        let refreshToken = await user.generateRefreshToken()

        await user.save()

        let resData = user
        resData.tokens = '';


        delete resData.reset_password_token;
        delete resData.reset_password_expires;
        delete resData.password;
        resData.tokens = newToken

        sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'USER.login_success', resData, req.headers.lang);

    } catch (err) {
        console.log('err.....', err)
        sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}


exports.accountVerify = async (req, res, next) => {

    try {
        
        const userId = req.query.user_id
        const data = await User.findOneAndUpdate({_id : userId}  , {$set:{verify_token : true}} , {new:true});
        // if (data == 1) {
        //     res.redirect(BASEURL + `v1/users/email-verify/verify?user_id=${userId}`)
        // } else {
        //     res.redirect(BASEURL + `v1/users/email-verify/unverify?user_id=${userId}`)
        // }
        
        sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'USER.user_account_verify', data, req.headers.lang);

    } catch (err) {
        console.log(err)
        sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}


exports.search_all_employee = async (req , res , next) => {

    try {
        
        const {
            email,
            firstName,
            mobileNumber,
            page = 1,
            limit = 10,
            offset = 0,
            sortBy = "created_at",
            sortOrder = "email",
          } = req.query;
      
          const query = {};
      
          if (email) {
            query.email = { $regex: email, $options: "i" }; // Case-insensitive search by email
          }
      
          if (firstName) {
            query.firstName = { $regex: firstName, $options: "i" }; // Case-insensitive search by customer name
          }
      
          if (mobileNumber) {
            query.mobileNumber = { $regex: mobileNumber, $options: "i" }; // Case-insensitive search by customer name
          }
          // Calculate skip for pagination
          const skip = (parseInt(page) - 1) * parseInt(limit) + parseInt(offset);

          const projection = {
            user_type: 3,
            email: 1,
            firstName: 1,
            mobileNumber: 1,
            lastName:1,
            jobTitle:1,
            department:1,
            hireDate:1
        };
        
        
        const Empoyee = await User.find(query, projection)
            .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
            .skip(skip)
            .limit(parseInt(limit));
      
        sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'USER.search_all_employeey', Empoyee , req.headers.lang);

    } catch (err) {
        console.log(err)
        sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
     
}



exports.search_employee = async (req , res , next) => {

    try {
        
        const {
            email,
            firstName,
            mobileNumber,
            page = 1,
            limit = 10,
            offset = 0,
            sortBy = "created_at",
            sortOrder = "email",
          } = req.query;
      
          const query = {};
      
          if (email) {
            query.email = { $regex: email, $options: "i" }; // Case-insensitive search by email
          }
      
          if (firstName) {
            query.firstName = { $regex: firstName, $options: "i" }; // Case-insensitive search by customer name
          }
      
          if (mobileNumber) {
            query.mobileNumber = { $regex: mobileNumber, $options: "i" }; // Case-insensitive search by customer name
          }
          // Calculate skip for pagination
          const skip = (parseInt(page) - 1) * parseInt(limit) + parseInt(offset);
        
        const Employee = await User.findOne({user_type: 3 || email || mobileNumber || firstName})
            .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
            .skip(skip)
            .limit(parseInt(limit));
      
        sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'USER.search_employee', Employee , req.headers.lang);

    } catch (err) {
        console.log(err)
        sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
     
}


exports.update_employee = async (req , res ,next) => {

    try {
        
        const { employeeId } = req.query;
        const reqBody = req.body;
        const bearerToken = req.headers.authorization;

        if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
          return res.status(401).json({ message: 'Unauthorized: Bearer token missing or invalid' });
        }
    
           const token = bearerToken.replace('Bearer ', '');
    
          const decoded = jwt.verify(token, JWT_SECRET); // Replace with your actual secret key
        
          const checkAdmin = await User.findById(decoded._id);

          if(checkAdmin.user_type !== 1)

          return req.status(constants.WEB_STATUS_CODE.BAD_REQUEST).send({status:constants.STATUS_CODE.FAIL , msg:'user not admin'})
          reqBody.updated_at = dateFormat.set_current_date();
          const employee = await User.findOneAndUpdate({_id: employeeId }, reqBody ,{ new:true });
          
        return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'USER.update_employee', employee , req.headers.lang);

    } catch (err) {
        console.log(err)
       return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}


exports.delete_employee = async (req , res ,next) => {

    try {
        
        const { employeeId } = req.query;
        const reqBody = req.body;
        const bearerToken = req.headers.authorization;

        if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
          return res.status(401).json({ message: 'Unauthorized: Bearer token missing or invalid' });
        }
    
           const token = bearerToken.replace('Bearer ', '');
    
          const decoded = jwt.verify(token, JWT_SECRET); // Replace with your actual secret key
        
          const checkAdmin = await User.findById(decoded._id);

          if(checkAdmin.user_type !== 1)
          
          return req.status(constants.WEB_STATUS_CODE.BAD_REQUEST).send({status:constants.STATUS_CODE.FAIL , msg:'user not admin'})

          const employee = await User.findOneAndDelete({_id:employeeId})

        return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'USER.delete_employee', employee , req.headers.lang);

    } catch (err) {
        console.log(err)
       return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}