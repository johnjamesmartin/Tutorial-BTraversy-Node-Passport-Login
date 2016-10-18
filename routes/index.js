/* Node modules: */

var express = require('express');
var router = express.Router();


/* GET root route: */

router.get('/', function(req, res) {
    res.render('index');
});

module.exports = router;