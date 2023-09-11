
const { body, query, validationResult } = require('express-validator');

const validStatus = ["Pending", "Approved", "Rejected"];

//validate user form detail
exports.leave_validator = [

  body('leaveType')
    .not()
    .isEmpty()
    .withMessage('leaveType is required')
    .isString()
    .withMessage('leaveType should be a string')
    .trim(),

  body('startDate')
    .not()
    .isEmpty()
    .withMessage('startDate is required')
    .isString()
    .withMessage('startDate shoulde be a string')
    .trim(),

  body('endDate')
    .not()
    .isEmpty()
    .withMessage('endDate is required')
    .isString()
    .withMessage('endDate shoulde be a string')
    .trim(),

  body('comments')
    .not()
    .isEmpty()
    .withMessage('comments is required')
    .isString()
    .withMessage('comments shoulde be a string')
    .trim(),
];

exports.update_leave_validator = [

  query('LeaveId')
    .not()
    .isEmpty()
    .withMessage('LeaveIdis required')
    .isString()
    .withMessage('LeaveId shoulde be a string')
    .isMongoId()
    .withMessage('Enter valid LeaveId')
    .trim(),

    body('Approved_by')
    .not()
    .isEmpty()
    .withMessage('Approved_by is required')
    .isString()
    .withMessage('Approved_by shoulde be a string')
    .trim(),

    body('status')
    .not()
    .isEmpty()
    .withMessage('status is required')
    .isString()
    .withMessage('status shoulde be a string')
    .isIn(validStatus)
    .withMessage('please Enter valid status')
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
