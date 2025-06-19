const db = require('../models');
const Ticket = db.ticket;
const User = db.user;

exports.createTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create({
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      priority: req.body.priority || 'medium',
      created_by: req.userId
    });
    
    res.status(201).send(ticket);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'email']
        },
        {
          model: User,
          as: 'assignee',
          attributes: ['id', 'username', 'email']
        }
      ]
    });
    
    res.status(200).send(tickets);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.assignTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    
    if (!ticket) {
      return res.status(404).send({ message: "التذكرة غير موجودة" });
    }
    
    await ticket.update({
      assigned_to: req.body.assigned_to,
      status: 'in_progress'
    });
    
    res.status(200).send({ message: "تم تعيين التذكرة بنجاح" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateTicketStatus = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    
    if (!ticket) {
      return res.status(404).send({ message: "التذكرة غير موجودة" });
    }
    
    await ticket.update({ status: req.body.status });
    
    res.status(200).send({ message: "تم تحديث حالة التذكرة بنجاح" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};