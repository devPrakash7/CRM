module.exports = {

    'USER': {
        signUp_success: 'employee signUp successfully.',
        login_success: 'employee checked in successfully.',
        admin_login_success: 'Admin Login successfully.',
        manager_login_success:'manager login successfully',
        manager_logout_success:'manager logout successfully',
        logout_success: 'employee checked out successfully.',
        logout_fail: 'Error while logging you out.',
        userDetail_not_available: 'User details not available at this time.',
        invalidOldPassword: 'Please enter a valid old password.',
        passwordMinLength: 'Your password must contain at least 6 characters.',
        email_not_found: 'Username/Email is not registered.',
        user_name_already_exist: 'This username has already been taken. Please enter a different username.',
        email_already_exist: 'Email already in use.',
        delete_account: 'Your account is deleted.',
        not_verify_account: 'Please verify your account.',
        deactive_account: 'Your account is deactivated by administrator.',
        inactive_account: 'Your account is deactivated by administrator.',
        account_verify_success: `Your account has been verified successfully. Please click 'Continue' in the app to proceed.`,
        account_verify_fail: 'Your account verify link expire or invalid.',
        password_mismatch: 'New password and confirm password not matched.',
        invalid_username_password: "Invalid email or password.",
        invalid_password: "Invalid password.",
        user_activation : 'User activated successfully.',
        user_inactivation : 'User inactivated successfully.',
        user_deactivate : 'User deactivated successfully.',
        logout_success: "Logout successfully.",
        account_already_verify: "Account alredy verify",
        user_account_verify:'user account verify sucessfully',
        search_all_employee:'sucessfully search all employees',
        search_employee:'sucessfully search employees',
        update_employee:'sucessfully update employee',
        delete_employee:'sucessfully delete employee',
        check_for_admin:'your are not admin , only admin can be added',
        only_searched_employees_data : 'only searched employee this email or mobileNumber for admin or manager'
    },

    'DEPARTMENT':{

       add_department : 'add department sucessfully',
       check_for_admin : 'your are not admin',
       list_of_departments : 'sucessfully return all the list of department',
       department_data_found :'department data found',
       department_name_already_exist : 'department name already exists',
       update_department:'sucessfully updated department',
       delete_department:'sucessfully deleted department',
       department_status_updated : 'department status updated sucessfully'
    },

    'ATTENDANCE':{
        mark_attendance : 'mark attendance sucessfully',
        check_for_admin : 'your are not admin',
        not_found:'Bearer token missing or invalid',
        get_employee_attendance: 'sucessfully get employee attendance',
        employee_not_found : 'employee not found'
    },

    'GENERAL': {
        
        general_error_content: 'Something went wrong. Please try again later.',
        unauthorized_user: 'Unauthorized, please login.',
        invalid_user: 'You are not authorized to do this operation.',
        invalid_login: 'You are not authorized.',
        blackList_mail: `Please enter a valid email, we don't allow dummy emails.`
    },
}