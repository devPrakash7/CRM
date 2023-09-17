const { body, query, param , validationResult } = require('express-validator');


exports.add_payrollmanagement_validator = [

       body('employeeId')
       .not()
      .isEmpty()
      .withMessage('employeeId is required')
      .isString()
      .withMessage('employeeId should be a string')
      .isMongoId()
      .withMessage('please enter a valid employeeId')
      .trim(),

      body('salary')
       .not()
      .isEmpty()
      .withMessage('salary is required')
      .isNumeric()
      .withMessage('salary should be a Number')
      .trim(),

      body('payroll_period')
      .not()
     .isEmpty()
     .withMessage('payroll_period is required')
     .isString()
     .withMessage('payroll_period should be a String')
     .trim(),

     body('description')
     .not()
    .isEmpty()
    .withMessage('description is required')
    .isString()
    .withMessage('description should be a String')
    .trim(),

    body('bonuses')
    .not()
   .isEmpty()
   .withMessage('bonuses is required')

]

exports.update_payrollmanagement_validator = [

  param('payrollId')
  .not()
  .isEmpty()
  .withMessage('payrollId is required')
  .isString()
  .withMessage('payrollId should be a string')
  .isMongoId()
  .withMessage('please enter valid payrollId')
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
  