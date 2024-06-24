const User = require('../models/user');
const Role = require('../models/role');
const Company = require('../models/CompanySchema');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const sendCookie = require('../utils/sendCookie');
const ErrorHandler = require('../utils/errorHandler');


exports.register = async (req, res, next) => {
  // const { name, email, password, role_name, companyId } = req.body;
  const { name, email, password, role_name, companyName } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler("User Already Exist", 400));
    }

    // Find the role by role_name
    const role = await Role.findOne({ role_name });
    // console.log("role",role_name)
    if (!role) {
      return next(new ErrorHandler("Role Not Found", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the companyName exists
    if(companyName){
      
    }
    const company = await Company.findOne({ name: companyName });
    if (!company) {
      return next(new ErrorHandler("Company not found", 400));
    }

    // Create a new user
    user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role._id,
      companyId: company ? company._id : null,
    });
    if (role_name == 'admin') {
      company.admin.push(user._id);
    }

    company.user.push(user._id);

    await company.save();

    sendCookie(user._id, role_name, res, "Registered Successfully", 201);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.login = async (req, res, next) => {
  try {


    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password").populate('role');
    if (!user) {
      return next(new ErrorHandler("User Not found", 400));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorHandler("Invalid Email or Password", 400));
    }

    sendCookie(user._id, user.role.role_name, res, `Welcome back, ${user.name}`, 200);

  } catch (error) {
    next(error);
    // res.status(500).json({ message: 'Server error' });
  }
};


exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('role');

    if (!user) {
      return next(new ErrorHandler("User Not found", 400));
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role.role_name,
      },
    });
  } catch (error) {
    next(error);
  }
};


exports.updateUser = async (req, res, next) => {
  const { userId, name, email, password, role_name, companyName, isActive } = req.body;

  try {
    // Find the user by ID
    let user = await User.findById(userId);
    if (!user) {
      return next(new ErrorHandler("User Not Found", 404));
    }

    // Update user details
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (isActive) user.isActive = isActive;
    user.updated_ts = Date.now(); // Update timestamp

    // Find the role by role_name if provided
    if (role_name) {
      const role = await Role.findOne({ role_name });
      if (!role) {
        return next(new ErrorHandler("Role Not Found", 400));
      }
      user.role = role._id;

    }

    // Check if the companyName exists if provided
    if (companyName) {
      const company = await Company.findOne({ name: companyName });
      if (!company) {
        return next(new ErrorHandler("Company not found", 400));
      }
      user.companyId = company._id;
      if (role_name == 'admin') {
        company.admin.push(user._id);
      }
      company.user.push(user._id);
      await company.save();
    }

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.deleteUser = async (req, res, next) => {
  const { userId } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId).populate('role');
    if (!user) {
      return next(new ErrorHandler("User Not Found", 404));
    }

    // If the user is associated with a company, remove the user from the company's user array
    if (user.companyId) {
      const company = await Company.findById(user.companyId);
      if (company) {
        if (user.role.role_name == 'admin') {
          company.admin = company.admin.filter(admin => !admin.equals(userId));
        }
        company.user = company.user.filter(user => !user.equals(userId));
        await company.save();
      }
    }

    // Delete the user
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getAllUser = async (req, res) => {
  const users = await User.find({});

  res.json({
    success: true,
    users,
  });
};


exports.logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Develpoment" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};




exports.isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    // console.log("Received token:", token);

    if (!token)
      return res.status(404).json({
        success: false,
        message: "Login First",
      });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log("Decoded token:", decoded);

    req.user = await User.findById(decoded._id);

    if (!req.user) {
      return next(new ErrorHandler("User not found", 404));
    }

    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid token, please log in again", 401));
  }
};




// const User = require('../models/user');
// const jwt = require("jsonwebtoken");
// const bcrypt = require('bcryptjs');
// const sendCookie = require('../utils/sendCookie');
// const ErrorHandler = require('../utils/errorHandler');

// console.log(req.cookies)

// exports.login = async (req, res, next) => {
//   try {

//     const { email, password } = req.body;

//     const user = await User.findOne({ email }).select("+password");
//     if (!user) {
//       return next(new ErrorHandler("User Not found", 400));
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return next(new ErrorHandler("Invalid Email or Password", 400));
//     }

//     sendCookie(user, res, `Welcome back, ${user.name}`, 200);

//   } catch (error) {
//     next(error);
//     // res.status(500).json({ message: 'Server error' });
//   }
// };




// exports.register = async (req, res, next) => {
//   const { name, email, password, role } = req.body;

//   try {
//     let user = await User.findOne({ email });

//     if (user) {
//       return next(new ErrorHandler("User Already Exist", 400));
//     }


//     const hashedPassword = await bcrypt.hash(password, 10);

//     user = await User.create({ name, email, password: hashedPassword, role });

//     sendCookie(user, res, "Registered Successfully", 201);

//   } catch (error) {
//     next(error);
//     console.error('Error during registration:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.getUserProfile = async (req, res) => {
//   const user = await User.findById(req.user._id)

//   if (user) {
//     res.json({
//       id: user._id,
//       name: user.name,
//       role: user.role,
//       email: user.email,
//     })
//   } else {
//     return next(new ErrorHandler("User Not found", 400));
//   }
// }


// exports.logout = (req, res) => {
//   res
//     .status(200)
//     .cookie("token", "", {
//       expires: new Date(Date.now()),
//       sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
//       secure: process.env.NODE_ENV === "Develpoment" ? false : true,
//     })
//     .json({
//       success: true,
//       user: req.user,
//     });
// };




// exports.isAuthenticated = async (req, res, next) => {
//   try {
//     const { token } = req.cookies;

//     // console.log("Received token:", token);

//     if (!token)
//       return res.status(404).json({
//         success: false,
//         message: "Login First",
//       });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // console.log("Decoded token:", decoded);

//     req.user = await User.findById(decoded._id);

//     if (!req.user) {
//       return next(new ErrorHandler("User not found", 404));
//     }

//     next();
//   } catch (error) {
//     return next(new ErrorHandler("Invalid token, please log in again", 401));
//   }
// };













