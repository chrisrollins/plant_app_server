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
		models.login(req, res, function(err, rows, fields){

			res.json({errors: err, data: rows});
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

		if(!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(req.body.email)){
			valid = false;
			validationErrors.push("Invalid email.");
		}

		if(!/^[a-z ]{2,32}$/i.test(req.body.username)){
			valid = false;
			validationErrors.push("Invalid username. Only numbers and letters are allowed.");
		}

		if(valid){
			models.registration(Object.assign({sessionID: req.sessionID}, req.body), function(err, rows, fields){
				if(err){
					if(err.code === "ER_DUP_ENTRY"){
						validationErrors.push("User Name and/or Email is already taken.");
					}
					console.log(err);
				}else{
					req.session.data = {id: rows.insertId};
					console.log("rows from register model", rows);
				}

				res.json({errors: validationErrors, data: rows});
			});
		}else{
			res.json({errors: validationErrors, data: undefined});
		}
	},
}