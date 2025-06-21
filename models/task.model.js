const { DataTypes } = require('sequelize');
const db = require('../config/db.config');

const Task = db.define('tasks', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
    defaultValue: 'medium'
  },
  status: {
    type: DataTypes.ENUM('todo', 'in_progress', 'in_review', 'completed'),
    defaultValue: 'todo'
  },
  due_date: {
    type: DataTypes.DATE
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// العلاقات
Task.associate = (models) => {
  Task.belongsTo(models.Project, {
    foreignKey: 'project_id',
    as: 'project'
  });
  Task.belongsTo(models.User, {
    foreignKey: 'assigned_to',
    as: 'assignee'
  });
  Task.hasMany(models.TaskComment, {
    foreignKey: 'task_id',
    as: 'comments'
  });
};

module.exports = Task;