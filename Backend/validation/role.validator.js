const { body, query,param , validationResult } = require('express-validator');


exports.add_role_validator = [

       body('userType')
       .not()
      .isEmpty()
      .withMessage('userType is required')
      .isString()
      .withMessage('userType should be a string')
      .trim(),

      body('userTypeName')
      .not()
     .isEmpty()
     .withMessage('userTypeName is required')
     .isString()
     .withMessage('userTypeName should be a string')
     .trim(),

     body('name')
     .not()
    .isEmpty()
    .withMessage('name is required')
    .isString()
    .withMessage('name should be a string')
    .trim(),

    body('role')
    .not()
   .isEmpty()
   .withMessage('role is required')
   .isString()
   .withMessage('role should be a string')
   .trim(),

   body('email')
   .not()
  .isEmpty()
  .withMessage('email is required')
  .isString()
  .withMessage('email should be a string')
  .isEmail()
  .withMessage('please enter a valid email')
  .trim(),

]

exports.update_role_validator = [

  param('roleId')
  .not()
  .isEmpty()
  .withMessage('roleId is required')
  .isString()
  .withMessage('roleId should be a string')
  .isMongoId()
  .withMessage('please enter valid roleId')
  .trim(),
]

exports.delete_role_validator = [

  param('roleId')
  .not()
  .isEmpty()
  .withMessage('roleId is required')
  .isString()
  .withMessage('roleId should be a string')
  .isMongoId()
  .withMessage('please enter valid roleId')
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
  