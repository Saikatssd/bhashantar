const express = require('express');
const router = express.Router();
const Project = require('../models/projectSchema');
const ErrorHandler = require('../utils/errorHandler');

exports.createProject = async (req, res,next) => {
  const { project_name, companyId } = req.body;

  //   if (!project_name || !companyId) {
  if (!project_name) {
    return next(new ErrorHandler("Missing required fields", 400));
  }

  try {
    const newProject = new Project({ name: project_name });
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating project' });
  }
};



exports.getProject = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching projects' });
  }
};

