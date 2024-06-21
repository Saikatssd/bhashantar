const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');



exports.permission = async (req, res, next) => {

  const { userId } = req.params;
  const { permissions } = req.body;
  // console.log(permissions);

  try {
    const user = await User.findById(userId);
    if (!user) return next(new ErrorHandler("User Not found", 400));

    user.permissions = permissions;
    await user.save();
    res.status(200).json({ message: 'Permissions updated successfully' });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};