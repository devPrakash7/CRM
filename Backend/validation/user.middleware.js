
const { body, validationResult } = require('express-validator');

//validate user form detail
exports.user_validator = [
    body('email')
      .not()
      .isEmpty()
      .withMessage('USER_VALIDATION.email_required')
      .isEmail().withMessage('USER_VALIDATION.valid_email')
      .trim(),

    body('password')
      .not()
      .isEmpty()
      .withMessage('USER_VALIDATION.password_required')
      .trim()
      .isLength({ min: 6 })
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/)
      .withMessage('USER_VALIDATION.password_validation'),
 
];


exports.login_validator = [
  body('email')
    .not()
    .isEmpty()
    .withMessage('USER_VALIDATION.email_required')
     .isEmail().withMessage('USER_VALIDATION.email_valid')
     .trim(),
  body('password')
    .not()
    .isEmpty()
    .withMessage('USER_VALIDATION.password_required')
    .trim()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/)
    .withMessage('USER_VALIDATION.password_validation'),
];



exports.ValidatorResult = (req, res, next) => {

  const result = validationResult(req);
  const haserror = !result.isEmpty();

  if (haserror) {
    const err = result.array()[0].msg;
    return res.status(400).send({ sucess: false, message: err });
  }

  next();
};
