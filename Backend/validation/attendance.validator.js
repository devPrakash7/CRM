const { body, query,param , validationResult } = require('express-validator');


exports.add_attendance_validator = [

       body('location')
       .not()
      .isEmpty()
      .withMessage('location is required')
      .isString()
      .withMessage('location should be a string')
      .trim(),

]

exports.update_attendance_validator = [

  query('attendanceId')
  .not()
  .isEmpty()
  .withMessage('attendanceId is required')
  .isString()
  .withMessage('attendanceId should be a string')
  .isMongoId()
  .withMessage('please enter valid attendanceId')
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
  