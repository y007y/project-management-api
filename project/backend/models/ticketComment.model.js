const { DataTypes } = require('sequelize');
const db = require('../config/db.config');

const TicketComment = db.define('ticket_comments', {
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
TicketComment.associate = (models) => {
  TicketComment.belongsTo(models.Ticket, {
    foreignKey: 'ticket_id',
    as: 'ticket'
  });
  TicketComment.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user'
  });
};

module.exports = TicketComment;