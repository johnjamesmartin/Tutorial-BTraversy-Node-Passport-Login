/* Node modules: */

var express = require('express');
var router = express.Router();


/* GET register route: */

router.get('/register', function(req, res) {
    res.render('register');
});


/* GET login route: */

router.get('/login', function(req, res) {
    res.render('login');
});



module.exports = router;