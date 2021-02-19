// require Json web token
const jwt = require('jsonwebtoken');

// Require the user Schema
const User = require('../models/UserModel');

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers['x-auth-token'];
    // Check for token
    if (!token)
      return res.status(401).send({ msg: 'No Token, authorization denied' });

    const decoded = await jwt.verify(token, process.env.secretOrKey);

    // Add User from payload
    const user = await User.findById(decoded.id);
    //Check for user
    if (!user) {
      return res.status(401).send({ msg: 'authorization denied' });
    }
    // Create user
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ msg: 'Token is not valid' });
  }
};

module.exports = isAuth;