const express = require('express');
const router = express.Router();

const checkRole = require("../middleware/checkRole")
const projectController = require("../controllers/projectController");


router.get('/getProject', projectController.getProject);

router.post('/createProject', projectController.createProject);



module.exports = router;