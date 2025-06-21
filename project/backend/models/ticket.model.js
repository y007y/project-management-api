const { DataTypes } = require('sequelize');
const db = require('../config/db.config');

const Ticket = db.define('tickets', {
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
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('technical', 'financial', 'administrative', 'other'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('open', 'in_progress', 'resolved', 'closed'),
    defaultValue: 'open'
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
    defaultValue: 'medium'
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// العلاقات
Ticket.associate = (models) => {
  Ticket.belongsTo(models.User, {
    foreignKey: 'created_by',
    as: 'creator'
  });
  Ticket.belongsTo(models.User, {
    foreignKey: 'assigned_to',
    as: 'assignee'
  });
  Ticket.hasMany(models.TicketComment, {
    foreignKey: 'ticket_id',
    as: 'comments'
  });
};

module.exports = Ticket;