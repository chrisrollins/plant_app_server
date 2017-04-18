//User controller

//the following things enable this controller to access the models, and also to send html files as responses
var path = require("path");
var htmlPath = path.join(__dirname, "./../../client/");
var requireFolder = require("./../config/req_folder.js");
var models = require(path.join(__dirname, "./../config/model_combiner.js"));

//when you call a model function it should return a value (usually an array, the result of a query)
//after that you can make the response here in the controller

module.exports = {
	userLogin: function(req, res){
		models.login(req, res, function(){
			res.render('/logintest.html');
		});
	},
	userRegistration: function(req, res){
		let valid = true;
		const validationErrors = [];
		console.log(req.body);

		for(let field of ["username", "email", "password"]){
			if(!req.body[field]){
				valid = false;
				validationErrors.push(`${field} is required.`)
			}
		}
		console.log("password and confirm password:", req.body.password, req.body.confirmPassword);
		console.log(req.body.password !== req.body.confirmPassword);
		if(req.body.password !== req.body.confirmPassword){
			valid = false;
			validationErrors.push("Password and confirm password don't match.");
		}

		if(valid){
			models.registration(req, res, function(err, rows, fields){
				if(err){
					console.log(err);
				}else{
					console.log("rows from register model", rows);
				}

				res.json({errors: err, data: rows});
			});
		}else{
			res.json({errors: validationErrors, data: undefined});
		}
	},
}