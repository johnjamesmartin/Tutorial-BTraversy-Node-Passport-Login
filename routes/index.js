/* Node modules: */

var express = require('express');
var router = express.Router();


/* GET root route: */

router.get('/', function(req, res) {
    res.render('index');
});


/* Check user is logged in: */

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		// req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}



module.exports = router;