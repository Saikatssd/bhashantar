const express = require('express');
const Role = require('../models/role');
const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler')


exports.getRoles = async (req, res, next) => {
  try {
    // Fetch all roles from the database
    const roles = await Role.find();

    res.status(200).json({ roles });
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

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
  // console.log("roleId",roleId)
  // const { roleId } = req.body;

  try {
    // if (role_name === 'admin' || 'superAdmin' || 'user') {
    //   return next(new ErrorHandler("Default Roles cannot be changed ", 405));
    // }
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
  const { roleId } = req.body;

  try {
    // Find the role by ID
    const role = await Role.findById(roleId);
    if (!role) {
      return next(new ErrorHandler("Role Not Found", 404));
    }

    // Check if the role is allowed to be deleted
    if (!role.isAllowedToDelete) {
      return next(new ErrorHandler("This role cannot be deleted", 403));
    }

    // Find all users associated with the role to be deleted
    const users = await User.find({ role: role._id });

    // Delete all users associated with this role
    for (let user of users) {
      await User.findByIdAndDelete(user._id);
    }

    // Delete the role
    await Role.findByIdAndDelete(roleId);

    res.status(200).json({ message: 'Role and associated users deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
