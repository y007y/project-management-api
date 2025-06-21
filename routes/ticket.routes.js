// ticket routes placeholder
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Ticket route');
});

module.exports = router;