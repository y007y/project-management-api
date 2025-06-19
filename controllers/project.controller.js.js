const db = require('../models');
const Project = db.project;
const User = db.user;

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      status: req.body.status || 'planned',
      created_by: req.userId
    });
    
    res.status(201).send(project);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [{
        model: User,
        as: 'creator',
        attributes: ['id', 'username', 'email']
      }]
    });
    
    res.status(200).send(projects);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'creator',
        attributes: ['id', 'username', 'email']
      }]
    });
    
    if (!project) {
      return res.status(404).send({ message: "المشروع غير موجود" });
    }
    
    res.status(200).send(project);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    
    if (!project) {
      return res.status(404).send({ message: "المشروع غير موجود" });
    }
    
    await project.update(req.body);
    
    res.status(200).send({ message: "تم تحديث المشروع بنجاح" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    
    if (!project) {
      return res.status(404).send({ message: "المشروع غير موجود" });
    }
    
    await project.destroy();
    
    res.status(200).send({ message: "تم حذف المشروع بنجاح" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};