const jwt = require("jsonwebtoken");


module.exports = sendCookie = (user, res, message, statusCode = 200) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
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
            path:'/',
        })
        .json({
            success: true,
            message,
            userToken: token,
            user,
        });

};