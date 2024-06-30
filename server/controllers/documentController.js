
const Document = require('../models/document');
const Project = require('../models/projectSchema');
const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler')
const mongoose = require('mongoose');


//for checking docs
exports.createDocument = async (req, res, next) => {
    const { project_id, file_name, page_count, original_content, translated_content } = req.body;

    // Validation
    if (!project_id || !file_name || !page_count || !original_content || !translated_content) {
        return next(new ErrorHandler("Missing required fields", 400));
    }

    try {
        const project = await Project.findById(project_id);
        if (!project) {
            return next(new ErrorHandler("Project Not Found", 400));
        }

        const newDocument = new Document({ project_id, file_name, page_count, original_content, translated_content });
        const savedDocument = await newDocument.save();
        res.status(201).json(savedDocument);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating document' });
    }
};



// router.get('/project/:projectId/documents', 
exports.getDocuments = async (req, res) => {
    const { projectId } = req.params;

    try {
        const documents = await Document.find({ project_id: projectId });
        res.json(documents);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching documents' });
    }
};

//assign document to user

exports.assignDocument = async (req, res, next) => {

    const { documentId, userId } = req.body;

    if (!mongoose.isValidObjectId(documentId) || !mongoose.isValidObjectId(userId)) {
        return next(new ErrorHandler("Invalid document or user ID", 400));
    }


    try {
        const document = await Document.findById(documentId);
        if (!document) {
            return next(new ErrorHandler("Document Not Found", 400));

        }

        const user = await User.findById(userId);
        if (!user) {
            return next(new ErrorHandler("User Not Found", 400));

        }

        document.assigned_to = userId;
        await document.save();

        res.json(document);
    } catch (err) {
        // throw err;
        next(err);
        // res.status(500).json({ message: 'Error Assigning documents' });

    }
}


//get user's documents
exports.userDocument = async (req, res, next) => {
    const { userId } = req.body;
    if (!mongoose.isValidObjectId(userId)) {
        return next(new ErrorHandler("Invalid document or user ID", 400));
    }

    try {
        const documents = await Document.find({ assigned_to: userId });
        res.json(documents);
    } catch (err) {
        next(err)
    }
}