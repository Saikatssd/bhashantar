const express = require('express');
const router = express.Router();

const checkRole = require("../middleware/checkRole")
const documentController = require("../controllers/documentController");


router.post('/createDocument', documentController.createDocument);
router.get('/:projectId/documents', documentController.getDocuments);
router.post('/assignDocument', documentController.assignDocument);
router.get('/userDocument', documentController.userDocument);

module.exports = router;