//User controller

//the following things enable this controller to access the models, and also to send html files as responses
var path = require("path");
var htmlPath = path.join(__dirname, "./../../client/");
var requireFolder = require("./../config/req_folder.js");
var models = require(path.join(__dirname, "./../config/model_combiner.js"));
var bcrypt = require("bcryptjs");

//when you call a model function it should return a value (usually an array, the result of a query)
//after that you can make the response here in the controller

module.exports = {
	userLogin: function(req, res){
		let validationErrors = [];
		let statusCode = 200;
		models.userLogin(Object.assign({sessionID: req.sessionID}, req.body), function(err, rows, fields){
			console.log(rows, req.body, "!!!");
			if (err || rows.length === 0){
				validationErrors.push("Invalid login.");
				statusCode = 401;
			}
			else if (bcrypt.compareSync(req.body.password, rows[0].password)){
				req.session.data = {id : rows[0].id, username : rows[0].username};
				console.log("888888", bcrypt.compareSync(req.body.password, rows[0].password) );
			}else{
				statusCode = 401;
				validationErrors.push("Invalid login.");
			}
			res.status(statusCode).json({errors: validationErrors, success: (statusCode === 200) });
		});
	},
	userRegistration: function(req, res){
		let valid = true;
		let statusCode = 200;
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

		if(!/^[a-zA-Z0-9_.]+$/.test(req.body.username)){
			valid = false;
			validationErrors.push("Invalid username. Only letters, numbers, underscore, and period are allowed.");
		}

		if(valid){
			req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
			models.registration(Object.assign({sessionID: req.sessionID}, req.body), function(err, rows, fields){
				if(err){
					if(err.code === "ER_DUP_ENTRY"){
						validationErrors.push("User Name and/or Email is already taken.");
						statusCode = 401;
					}
					console.log(err);
				}else{
					req.session.data = {id: rows.insertId};
					console.log("rows from register model", rows);
				}

				res.status(statusCode).json({errors: validationErrors, data: rows});
			});
		}else{
			statusCode = 401;
			res.status(statusCode).json({errors: validationErrors, data: undefined});
		}
	},
}