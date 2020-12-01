const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Oates Secret Santa Picker', button:'Get Name'});
});

module.exports = router;
