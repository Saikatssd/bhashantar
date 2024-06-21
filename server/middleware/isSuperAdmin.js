const User = require('../models/user');
const Role = require('../models/roles');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const sendCookie = require('../utils/sendCookie');
const ErrorHandler = require('../utils/errorHandler');

const isSuperAdmin = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        // console.log(token)
        // if (!token)
        //     return res.status(404).json({
        //         success: false,
        //         message: "Login First",
        //     });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // console.log("Decoded token:", decoded);

        if (decoded.role === 'superadmin') {
            req.user = decoded;
            next();
        } else {
            return next(new ErrorHandler("Access denied", 403));
        }
    } catch (error) {
        return next(new ErrorHandler("Invalid Token or Access of SuperAdmin required ", 401));
    }
};

module.exports = isSuperAdmin;