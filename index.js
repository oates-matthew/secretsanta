const express = require('express');
const router = express.Router();
const budget = require('../app').budget;
const results = require('../app').results;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Oates Secret Santa Picker', button:'Get Name', budget: budget, santas:results});
});

module.exports = router;
