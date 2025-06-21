const { DataTypes } = require('sequelize');
const db = require('../config/db.config');

const TaskComment = db.define('task_comments', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

// العلاقات
TaskComment.associate = (models) => {
  TaskComment.belongsTo(models.Task, {
    foreignKey: 'task_id',
    as: 'task'
  });
  TaskComment.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user'
  });
};

module.exports = TaskComment;