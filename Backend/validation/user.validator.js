
const { body,query, validationResult } = require('express-validator');

const validGender = ["male" , "female" , "transgender"]
//validate user form detail
exports.user_validator = [

    body('email')
      .not()
      .isEmpty()
      .withMessage('email is required')
      .isString()
      .withMessage('email should be a string')
      .isEmail().withMessage('please enter a valid email')
      .trim(),

    body('password')
      .not()
      .isEmpty()
      .withMessage('password is required')
      .trim()
      .isLength({ min: 8 })
      .withMessage('password length mus be 8 and one special character')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/)
      .withMessage('please enter a valid password')
      .isString()
      .withMessage('password shoulde be a string')
      .trim() ,

      body('mobileNumber')
      .not()
      .isEmpty()
      .withMessage('mobileNumber is required')
      .trim()
      .isLength({ min: 10 })
      .withMessage('password length mus be 10')
      .isMobilePhone()
      .withMessage('please enter a valid mobileNumber')
      .isString()
      .withMessage('mobileNumber shoulde be a string')
      .trim() ,

      body('firstName')
      .not()
      .isEmpty()
      .withMessage('firstName is required')
      .isString()
      .withMessage('firstName shoulde be a string')
      .trim() ,

      body('lastName')
      .not()
      .isEmpty()
      .withMessage('lastName is required')
      .isString()
      .withMessage('lastName shoulde be a string')
      .trim() ,

      body('jobTitle')
      .not()
      .isEmpty()
      .withMessage('jobTitle is required')
      .isString()
      .withMessage('jobTitle shoulde be a string')
      .trim() ,

      body('age')
      .not()
      .isEmpty()
      .withMessage('age is required')
      .isNumeric()
      .withMessage('age shoulde be a Number')
      .isLength({max:2})
      .withMessage('age length should be a two')
      .trim() ,

      body('gender')
      .not()
      .isEmpty()
      .withMessage('gender is required')
      .isString()
      .withMessage('gender shoulde be a string')
      .isIn(validGender)
      .withMessage('please enter a valid gender')
      .trim() ,
 
];


exports.login_validator = [

  body('email')
  .not()
  .isEmpty()
  .withMessage('email is required')
  .isString()
  .withMessage('email should be a string')
  .isEmail().withMessage('please enter a valid email')
  .trim(),

body('password')
  .not()
  .isEmpty()
  .withMessage('password is required')
  .trim()
  .isLength({ min: 8 })
  .withMessage('password length mus be 8 and one special character')
  .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/)
  .withMessage('please enter a valid password')
  .isString()
  .withMessage('password shoulde be a string')
  .trim() ,
];


exports.update_role_validator = [

  body('user_type')
  .not()
  .isEmpty()
  .withMessage('user_type is required')
  .isNumeric()
  .withMessage('user_type should be a number')
  .trim(),

  query('employeeId')
  .not().isEmpty()
  .withMessage('employeeId is required')
  .isString()
  .withMessage('employeeId shoulde be a string')
  .isMongoId()
  .withMessage('Please enter valid employeeId')
  .trim() ,

]

exports.update_employee_validator = [

    query('employeeId')
    .not().isEmpty()
    .withMessage('employeeId is required')
    .isString()
    .withMessage('employeeId shoulde be a string')
    .isMongoId()
    .withMessage('Please enter valid employeeId')
    .trim() ,

]


exports.delete_employee_validator = [

  query('employeeId')
  .not().isEmpty()
  .withMessage('employeeId is required')
  .isString()
  .withMessage('employeeId shoulde be a string')
  .isMongoId()
  .withMessage('Please enter valid employeeId')
  .trim() ,

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
