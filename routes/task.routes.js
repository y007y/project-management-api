// task routes placeholder
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Task route');
});

module.exports = router;