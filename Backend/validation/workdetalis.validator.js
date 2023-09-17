
const { body, query,param, validationResult } = require('express-validator');


//validate user form detail
exports.add_work_validator = [

  body('task_name')
    .not()
    .isEmpty()
    .withMessage('task_name is required')
    .isString()
    .withMessage('task_name should be a string')
    .trim(),

    body('end_date')
    .not()
    .isEmpty()
    .withMessage('end_date is required')
    .isString()
    .withMessage('end_date should be a string')
    .trim(),

    body('priority')
    .not()
    .isEmpty()
    .withMessage('priority is required')
    .isString()
    .withMessage('priority should be a string')
    .trim(),

    
    body('assigned_by')
    .not()
    .isEmpty()
    .withMessage('assigned_by is required')
    .isString()
    .withMessage('assigned_by should be a string')
    .trim(),

    body('description')
    .not()
    .isEmpty()
    .withMessage('description is required')
    .isString()
    .withMessage('description should be a string')
    .trim(),

    query('adminId')
    .not()
    .isEmpty()
    .withMessage('this api only access by admin please passed adminId')
    .isString()
    .withMessage('adminId shoulde be a string')
    .isMongoId()
    .withMessage('please Enter valid adminId')
    .trim(),

    query('managerId')
    .not()
    .isEmpty()
    .withMessage('this api only access by manager please passed managerId')
    .isString()
    .withMessage('managerId shoulde be a string')
    .isMongoId()
    .withMessage('please Enter valid mangerId')
    .trim(),

];


exports.update_work_details_validator = [

  param('documentId')
  .not()
  .isEmpty()
  .withMessage('documentId is required')
  .isString()
  .withMessage('documentId shoulde be a string')
  .isMongoId()
  .withMessage('please Enter valid documentId')
  .trim(),


  query('adminId')
  .not()
  .isEmpty()
  .withMessage('this api only access by admin please passed adminId')
  .isString()
  .withMessage('adminId shoulde be a string')
  .isMongoId()
  .withMessage('please Enter valid adminId')
  .trim(),

  query('managerId')
  .not()
  .isEmpty()
  .withMessage('this api only access by manager please passed managerId')
  .isString()
  .withMessage('managerId shoulde be a string')
  .isMongoId()
  .withMessage('please Enter valid mangerId')
  .trim(),
  
]


exports.ValidatorResult = (req, res, next) => {

  const result = validationResult(req);
  const haserror = !result.isEmpty();

  if (haserror) {
    const err = result.array()[0].msg;
    return res.status(400).send({ sucess: false, message: err });
  }

  next();
};
