const express = require("express");
const router = express.Router();

const checkRole = require("../middleware/checkRole")
const authController = require("../controllers/authController");
const permissionController = require("../controllers/permissionController");
const roleController = require("../controllers/roleController");
const companyController = require("../controllers/companyController");

//auth routes 

router.post("/login", authController.login);
// router.post('/register',authController.register);
router.post('/register', checkRole('superAdmin'), authController.register);
router.put('/updateUser', checkRole('admin'), authController.updateUser);
router.delete('/deleteUser', checkRole('admin'), authController.deleteUser);
router.get('/all', checkRole('admin'), authController.getAllUser);
// router.get('/all',authController.isAuthenticated,authController.getAllUser);
router.get('/profile', authController.isAuthenticated, authController.getUserProfile);
router.get('/logout', authController.isAuthenticated, authController.logout);

//permission routes
// router.put('/permissions/:userId',permissionController.permission);

router.post("/createRole", checkRole('admin'), roleController.createRole);
router.put("/updateRole/:roleId", checkRole('admin'), roleController.updateRole);
router.delete("/deleteRole", checkRole('admin'), roleController.deleteRole);


router.put("/permission", checkRole('admin'), permissionController.permission);

router.post("/createCompany", checkRole('superAdmin'), companyController.createCompany);
router.get("/:companyId/users", checkRole('admin'), companyController.getCompanyUsersAndAdmins);
router.delete("/deleteCompany", checkRole('superAdmin'), companyController.deleteCompany);


module.exports = router;