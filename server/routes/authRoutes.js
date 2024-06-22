const express = require("express");
const router = express.Router();
const checkRole = require("../middleware/checkRole")

const authController = require("../controllers/authController");
const permissionController = require("../controllers/permissionController");
const isSuperAdmin = require("../middleware/isSuperAdmin");

//auth routes 

router.post("/login", authController.login);
// router.post('/register',authController.register);
router.post('/register',isSuperAdmin ,authController.register);
// router.post('/register',checkRole('superadmin') ,authController.register);
router.get('/all',authController.getAllUser);
// router.get('/all',authController.isAuthenticated,authController.getAllUser);
router.get('/profile', authController.isAuthenticated, authController.getUserProfile);
router.get('/logout', authController.isAuthenticated, authController.logout);

//permission routes
router.put('/permissions/:userId',isSuperAdmin,permissionController.permission);

module.exports = router;