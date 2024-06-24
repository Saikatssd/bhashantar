const Role = require('../models/role');
const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler')
const jwt = require('jsonwebtoken')

const checkRole = (roleName) => {
  return async (req, res, next) => {
    try {
      const { token } = req.cookies;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("Decoded token:", decoded);

      const user = await User.findById(decoded._id).populate('role');
      // console.log("user id", decoded._id)
      // console.log("user role",user.role.role_name)
      if (user.role.role_name === roleName || user.role.role_name === 'superAdmin') {
        next();
      } else {
        return next(new ErrorHandler("Access denied", 403));
      }
    } catch (err) {
      return next(new ErrorHandler(`Access of ${roleName} required `, 401));
    }
  };
};

module.exports = checkRole;
