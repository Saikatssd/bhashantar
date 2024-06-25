const express = require('express');
const Permission = require('../models/permission');
const Role = require('../models/role');
const ErrorHandler = require('../utils/errorHandler');

exports.getPermission = async (req, res, next) => {
  const { role_name } = req.query;

  try {
    // Find the role by role_name
    const role = await Role.findOne({ role_name });

    if (!role) {
      return next(new ErrorHandler("Role not found", 404));
    }

    // Find the permission by role
    const permission = await Permission.findOne({ role: role._id });

    if (!permission) {
      return next(new ErrorHandler("Permission not found for this role", 404));
    }

    res.status(200).json({ permission });
  } catch (error) {
    console.error('Error fetching permission:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.permission = async (req, res, next) => {
  const { role_name, links, view, add, edit, delete: del, upload, download } = req.body;

  try {
    // Find the role by role_name
    const role = await Role.findOne({ role_name });

    if (!role) {
      return next(new ErrorHandler("Role Not found", 404));
    }

    // Find the permission by role
    let permission = await Permission.findOne({ role: role._id });

    if (permission) {
      // Update the existing permission
      permission.view = view;
      permission.add = add;
      permission.edit = edit;
      permission.delete = del;
      permission.upload = upload;
      permission.download = download;

      // Add new links to the existing links array
      if (links && links.length > 0) {
        permission.links.push(...links.filter(link => !permission.links.includes(link)));
      }

      // Save the updated permission
      const updatedPermission = await permission.save();
      res.status(200).json({ message: 'Permission updated successfully', permission: updatedPermission });
    } else {
      // Create a new permission
      permission = new Permission({
        role: role._id,
        links,
        view,
        add,
        edit,
        delete: del,
        upload,
        download
      });

      // Save the new permission
      const savedPermission = await permission.save();

      // Update the role's permissions array
      role.permissions.push(savedPermission._id);
      await role.save();

      res.status(201).json({ message: 'Permission created and linked to role', permission: savedPermission });
    }
  } catch (error) {
    console.error('Error creating or updating permission:', error);
    res.status(500).json({ message: 'Server error' });
  }
};






// const express = require('express');
// const Permission = require('../models/permission');
// const Role = require('../models/role');
// const ErrorHandler = require('../utils/errorHandler');



// exports.createPermission= async (req, res) => {
//   const { role_name, link, view, add, edit, delete: del, upload, download } = req.body;

//   try {
    
//     const role = await Role.findOne({ role_name });

//     if (!role) {
//       if (!role) return next(new ErrorHandler("Role Not found", 404));
//     }

  
//     const permission = new Permission({
//       role: role._id,
//       link,
//       view,
//       add,
//       edit,
//       delete: del,
//       upload,
//       download
//     });

//     // Save the permission
//     const savedPermission = await permission.save();

//     // Update the role's permissions array
//     role.permissions.push(savedPermission._id);
//     await role.save();

//     res.status(201).json({ message: 'Permission created and linked to role', permission: savedPermission });
//   } catch (error) {
//     console.error('Error creating permission:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.updatePermission= async (req, res) => {
//   const { role_name, link, view, add, edit, delete: del, upload, download } = req.body;

//   try {
//     // Find the role by role_name
//     const role = await Role.findOne({ role_name });

//     if (!role) {
//       return res.status(404).json({ message: 'Role not found' });
//     }

//     // Find the permission by role and link
//     const permission = await Permission.findOne({ role: role._id, link });

//     if (!permission) {
//       return res.status(404).json({ message: 'Permission not found for the given link and role' });
//     }

//     // Update the permission fields
//     permission.view = view;
//     permission.add = add;
//     permission.edit = edit;
//     permission.delete = del;
//     permission.upload = upload;
//     permission.download = download;

//     // Save the updated permission
//     const updatedPermission = await permission.save();

//     res.status(200).json({ message: 'Permission updated successfully', permission: updatedPermission });
//   } catch (error) {
//     console.error('Error updating permission:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };



