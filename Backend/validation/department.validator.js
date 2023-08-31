const { body, query, validationResult } = require('express-validator');


exports.add_department_validator = [

       body('departmentName')
       .not()
      .isEmpty()
      .withMessage('departmentName is required')
      .isString()
      .withMessage('departmentName should be a string')
      .trim(),

      body('description')
      .not()
     .isEmpty()
     .withMessage('description is required')
     .isString()
     .withMessage('description should be a string')
     .trim(),
]

exports.get_department_validator = [

    body('departmentName')
    .not()
   .isEmpty()
   .withMessage('departmentName is required')
   .isString()
   .withMessage('departmentName should be a string')
   .trim(),
]

exports.department_status_validator = [

    body('departmentId')
    .not()
   .isEmpty()
   .withMessage('departmentId is required')
   .isString()
   .withMessage('departmentId should be a string')
   .isMongoId()
   .withMessage('please enter valid departmentId ')
   .trim(),
]

exports.update_department_validator = [

    body('departmentId')
    .not()
   .isEmpty()
   .withMessage('departmentId is required')
   .isString()
   .withMessage('departmentId should be a string')
   .isMongoId()
   .withMessage('please enter valid departmentId ')
   .trim(),
]

exports.delete_department_validator = [

    body('departmentId')
    .not()
   .isEmpty()
   .withMessage('departmentId is required')
   .isString()
   .withMessage('departmentId should be a string')
   .isMongoId()
   .withMessage('please enter valid departmentId ')
   .trim(),
]

exports.ValidatorResult = (req, res, next) => {

    exports. result = validationResult(req);
    exports. haserror = !result.isEmpty();
  
    if (haserror) {
      exports. err = result.array()[0].msg;
      return res.status(400).send({ sucess: false, message: err });
    }
  
    next();
  };
  