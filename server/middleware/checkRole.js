const Role = require('../models/roles');
const User = require('../models/user');
const mongoose = require('mongoose')

async function checkRole(roleName) {
  return async function (req, res, next) {
    try {
      const user = await User.findById(req.user.id).populate('role');
      if (user.role.role_name === roleName || user.role.role_name === 'superAdmin') {
        next();
      } else {
        res.status(403).json({ message: 'Forbidden' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}

module.exports = checkRole;
