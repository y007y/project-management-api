const db = require('../models');
const Task = db.task;
const Project = db.project;
const User = db.user;

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      project_id: req.body.project_id,
      assigned_to: req.body.assigned_to,
      priority: req.body.priority || 'medium',
      status: req.body.status || 'todo',
      due_date: req.body.due_date
    });
    
    res.status(201).send(task);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { project_id: req.params.projectId },
      include: [
        {
          model: User,
          as: 'assignee',
          attributes: ['id', 'username', 'email']
        },
        {
          model: Project,
          attributes: ['id', 'name']
        }
      ]
    });
    
    res.status(200).send(tasks);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    
    if (!task) {
      return res.status(404).send({ message: "المهمة غير موجودة" });
    }
    
    await task.update({ status: req.body.status });
    
    res.status(200).send({ message: "تم تحديث حالة المهمة بنجاح" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { assigned_to: req.userId },
      include: [
        {
          model: Project,
          attributes: ['id', 'name']
        }
      ]
    });
    
    res.status(200).send(tasks);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};