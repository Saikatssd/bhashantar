// controllers/companyController.js
const Company = require('../models/CompanySchema');
const User = require('../models/user');
const Role = require('../models/role');
const ErrorHandler = require('../utils/errorHandler');
const bcrypt = require('bcrypt');
const sendCookie = require('../utils/sendCookie');

exports.createCompany = async (req, res, next) => {
    const { companyName, adminName, adminEmail, adminPassword, adminRoleName } = req.body;

    try {
        // Check if the role exists
        const adminRole = await Role.findOne({ role_name: adminRoleName });
        // console.log("admin role", adminRole)
        if (!adminRole) {
            return next(new ErrorHandler("Admin Role Not Found", 400));
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        // Create a new admin user
        const adminUser = await User.create({
            name: adminName,
            email: adminEmail,
            password: hashedPassword,
            role: adminRole._id,
            isActive: true,
        });

        // Create the company with the admin user
        const newCompany = await Company.create({
            name: companyName,
            admin: [adminUser._id],
            user: [adminUser._id],
        });
        // console.log("Company", newCompany)

        // Update the user's companyId field
        adminUser.companyId = newCompany._id;
        await adminUser.save();

        sendCookie(adminUser._id, adminRole.role_name, res, "Company and Admin User Created Successfully", 201);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.getCompanyUsersAndAdmins = async (req, res, next) => {
    const { companyId } = req.params;
  
    try {
      // Find the company by ID
      const company = await Company.findById(companyId).populate('admin user');
  
      if (!company) {
        return next(new ErrorHandler("Company Not Found", 404));
      }
  
      // Get the admin and users of the company
      const admin = company.admin;
      const users = company.user;
  
      res.status(200).json({ admin, users });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  
//Delete the employees  too

exports.deleteCompany = async (req, res, next) => {
    const { companyId } = req.body;

    try {
        // Find the company by ID
        const company = await Company.findById(companyId);
        if (!company) {
            return next(new ErrorHandler("Company Not Found", 404));
        }

        // Find and delete all users associated with this company, including the admin
        const usersToDelete = [...company.user, company.admin];

        for (const userId of usersToDelete) {
            await User.findByIdAndDelete(userId);
        }

        // Delete the company
        await Company.findByIdAndDelete(companyId);

        res.status(200).json({ message: 'Company and associated users deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


//set the user's companyId to null


// exports.deleteCompany = async (req, res, next) => {
//     const { companyId } = req.body;
  
//     try {
//       // Find the company by ID
//       const company = await Company.findById(companyId);
//       if (!company) {
//         return next(new ErrorHandler("Company Not Found", 404));
//       }
  
//       // Find all users associated with the company
//       const users = await User.find({ companyId: company._id });
  
//       // Update all users' companyId to null
//       for (let user of users) {
//         user.companyId = null;
//         await user.save();
//       }
  
//       // Delete the company
//       await Company.findByIdAndDelete(companyId);
  
//       res.status(200).json({ message: 'Company deleted successfully' });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   };





