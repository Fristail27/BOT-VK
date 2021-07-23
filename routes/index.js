var express = require('express');
var router = express.Router();
const confirm = require('./confirm')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', confirm)

module.exports = router;
