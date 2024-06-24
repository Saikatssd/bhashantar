const express = require('express');
const Role = require('../models/role');
const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler')

exports.createRole = async (req, res, next) => {
  const { role_name, isAllowedToDelete } = req.body;

  try {
    const existingRole = await Role.findOne({ role_name });
    // console.log("role",existingRole)

    if (existingRole) {
      return next(new ErrorHandler("Role Already Exist", 400));
    }

    const newRole = await Role.create({
      role_name,
      permissions: [],
      isAllowedToDelete: isAllowedToDelete !== undefined ? isAllowedToDelete : true,
    });



    res.status(201).json({ message: 'Role created successfully', role: newRole });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.updateRole = async (req, res, next) => {
  const { role_name, isAllowedToDelete, isActive } = req.body;
  const { roleId } = req.params;

  try {
    if (role_name === 'admin' || 'superAdmin' || 'user') {
      return next(new ErrorHandler("Default Roles cannot be changed ", 405));
    }
    let role = await Role.findById(roleId);

    if (!role) {
      return next(new ErrorHandler("Role not found", 404));
    }

    // Update role fields
    role.role_name = role_name !== undefined ? role_name : role.role_name;
    role.isActive = isActive !== undefined ? isActive : role.isActive;
    role.isAllowedToDelete = isAllowedToDelete !== undefined ? isAllowedToDelete : role.isAllowedToDelete;
    role.updated_ts = Date.now(); // Update timestamp

    // Save updated role
    role = await role.save();

    res.status(200).json({ message: 'Role updated successfully', role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.deleteRole = async (req, res, next) => {
  const { role_name } = req.body;

  try {
    if (role_name === 'admin' || 'superAdmin' || 'user') {
      return next(new ErrorHandler("Default Roles cannot be deleled ", 405));
    }
    // Find the role by role_name
    const roleToDelete = await Role.findOne({ role_name });
    if (!roleToDelete) {
      return next(new ErrorHandler("Role Not Found", 404));
    }

    // Find the 'user' role to set as default
    const userRole = await Role.findOne({ role_name: 'user' });
    if (!userRole) {
      return next(new ErrorHandler("'user' Role Not Found", 404));
    }

    // Find all users with the role to be deleted
    const usersToUpdate = await User.find({ role: roleToDelete._id });

    // Update all users' role to 'user'
    for (let user of usersToUpdate) {
      user.role = userRole._id;
      await user.save();
    }

    // Delete the role
    await Role.findByIdAndDelete(roleToDelete._id);

    res.status(200).json({ message: 'Role deleted successfully and users updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};