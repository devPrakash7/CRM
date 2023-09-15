const { body, query, validationResult } = require('express-validator');


exports.add_documents_validator = [

       body('document_type')
       .not()
      .isEmpty()
      .withMessage('document_type is required')
      .isString()
      .withMessage('document_type should be a string')
      .trim(),

      body('document_name')
      .not()
     .isEmpty()
     .withMessage('document_name is required')
     .isString()
     .withMessage('document_name should be a string')
     .trim(),

]


exports.ValidatorResult = (req, res, next) => {

    const result = validationResult(req);
    const haserror = !result.isEmpty();
  
    if (haserror) {
      exports. err = result.array()[0].msg;
      return res.status(400).send({ sucess: false, message: err });
    }
  
    next();
  };
  