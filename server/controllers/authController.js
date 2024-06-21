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














//new 


const User = require('../models/user');
const Role = require('../models/roles');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const sendCookie = require('../utils/sendCookie');
const ErrorHandler = require('../utils/errorHandler');


const defaultPermissions = {
  user: [
    { link: '/someLink1', view: true, add: false, edit: false, delete: false, upload: true, download: true },
    // Add more default permissions for user
  ],
  admin: [
    { link: '/someLink1', view: true, add: true, edit: true, delete: false, upload: true, download: true },
    { link: '/someLink2', view: true, add: true, edit: true, delete: false, upload: true, download: true },
    // Add more default permissions for admin
  ],
  superadmin: [
    { link: '/register', view: true, add: true, edit: true, delete: true, upload: true, download: true },
    { link: '/someLink2', view: true, add: true, edit: true, delete: true, upload: true, download: true },
    // Add more default permissions for superadmin
  ]
};

// const isSuperAdmin = async (req, res, next) => {
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

//     if (decoded.role === 'superadmin') {
//       req.user = decoded;
//       next();
//     } else {
//       return next(new ErrorHandler("Access denied", 403));
//     }
//   } catch (error) {
//     return next(new ErrorHandler("Invalid Token", 401));
//   }
// };


exports.register = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler("User Already Exist", 400));
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      permissions: defaultPermissions[role]
    });

    sendCookie(user, res, "Registered Successfully", 201);

  } catch (error) {
    next(error);
    // console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res, next) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("User Not found", 400));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorHandler("Invalid Email or Password", 400));
    }
    // const token = jwt.sign({ userId: user._id, role: user.role_id }, 'secretKey', { expiresIn: '1h' });
    // res.json({ token });
    sendCookie(user, res, `Welcome back, ${user.name}`, 200);

  } catch (error) {
    next(error);
    // res.status(500).json({ message: 'Server error' });
  }
};




// exports.getUserProfile = async (req, res) => {
//   const user = await User.findById(req.user._id)

//   if (user) {
//     res.json({
//       user,
//       id: user._id,
//       name: user.name,
//       role: user.role,
//       email: user.email,
//     })
//   } else {
//     return next(new ErrorHandler("User Not found", 400));
//   }
// }

exports.getUserProfile = async (req, res, next) => {
  try {
    // console.log("Fetching user profile for:", req.user._id);
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(new ErrorHandler("User Not found", 400));
    }

    // console.log("User profile found:", user);

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
        permissions: user.permissions,
      },
    });
  } catch (error) {
    next(error);
  }
};



exports.getAllUser=async(req,res)=>{
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
