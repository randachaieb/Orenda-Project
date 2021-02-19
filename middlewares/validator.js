const { body, validationResult } = require('express-validator');

const registerRules = () => [
  body('fullname', 'fullname is required').notEmpty(),
  body('email', 'email is required').isEmail(),
  body('password', 'Password must contain 6 characters').isLength({
    min: 6,
    max: 20,
  }),
];

const loginRules = () => [
  body('email', 'email is required').isEmail(),
  body('password', 'Password must contain 6 characters').isLength({
    min: 6,
    max: 20,
  }),
];

const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array().map((el) => ({
        msg: el.msg,
      })),
    });
  }
  next();
};

module.exports = { validator, registerRules, loginRules };