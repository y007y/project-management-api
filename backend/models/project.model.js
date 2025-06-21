const { DataTypes } = require('sequelize');
const db = require('../config/db.config');

const Project = db.define('projects', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  start_date: {
    type: DataTypes.DATE
  },
  end_date: {
    type: DataTypes.DATE
  },
  status: {
    type: DataTypes.ENUM('planned', 'in_progress', 'completed', 'on_hold'),
    defaultValue: 'planned'
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// العلاقات
Project.associate = (models) => {
  Project.belongsTo(models.User, {
    foreignKey: 'created_by',
    as: 'creator'
  });
  Project.hasMany(models.Task, {
    foreignKey: 'project_id',
    as: 'tasks'
  });
};

module.exports = Project;