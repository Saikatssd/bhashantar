const jwt = require("jsonwebtoken");
const User = require('../models/user');



module.exports = sendCookie = async (userId,role, res, message, statusCode = 200) => {
    
    // const user = await User.findById(userId).populate('role');
    const user = await User.findById(userId);

    const token = jwt.sign({ _id: userId, role: role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res
        .status(statusCode)
        .cookie("token", token, {
            // httpOnly: true,
            httpOnly: false,
            maxAge: 15 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
            path: '/',
        })
        .json({
            success: true,
            _id: user._id,
            message,
            role,
            userToken: token,
            user,
        });

};

// const jwt = require("jsonwebtoken");
// const User = require('../models/user');

// const sendCookie = async (userId, res, message, statusCode = 200) => {
//     try {
//         const user = await User.findById(userId).populate('role');

//         if (!user) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }

//         if (!user.role || !user.role.role_name) {
//             return res.status(500).json({ success: false, message: 'Role information is missing' });
//         }

//         const token = jwt.sign({ _id: userId, role: user.role.role_name }, process.env.JWT_SECRET, {
//             expiresIn: process.env.JWT_EXPIRES_IN,
//         });

//         res
//             .status(statusCode)
//             .cookie("token", token, {
//                 httpOnly: false,
//                 maxAge: 15 * 60 * 1000,
//                 sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
//                 secure: process.env.NODE_ENV !== "Development",
//                 path: '/',
//             })
//             .json({
//                 success: true,
//                 _id: user._id,
//                 message,
//                 userToken: token,
//                 user,
//             });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// };

// module.exports = sendCookie;
