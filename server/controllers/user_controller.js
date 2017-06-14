//User controller

const path = require("path");
const htmlPath = path.join(__dirname, "./../../client/");
const requireFolder = require("./../config/req_folder.js");
const models = require(path.join(__dirname, "./../config/model_combiner.js"));
const bcrypt = require("bcryptjs");

const newUserDefaults = {
	money: 1000,
	permission_level: 0
};

module.exports = {
	userLogin: function(req, res) {
		let validationErrors = [];
		models.userLogin(Object.assign({ sessionID: req.sessionID }, req.body), function(err, rows, fields) {
			if (err || rows.length === 0) {
				validationErrors.push("That email address is not regiestered.");
				res.status(401).json({ errors: validationErrors, success: false });
			} else {
				bcrypt.compare(req.body.password, rows[0].password, function(err, result) {
	    			if (!err && result === true) {
						req.session.data = { username: rows[0].username };
						models.saveUserSession({ sessionID: req.sessionID, id: rows[0].id }, function(err, rows, fields) {
							if(!err) {
								res.status(200).json({ errors: validationErrors, success: true });
							} else {
								validationErrors.push("There was a problem while logging in. Please try again in a few minutes.");
								res.status(500).json({ errors: validationErrors, success: false });
							}
						});
					} else {
						validationErrors.push("Incorrect password.");
						res.status(401).json({ errors: validationErrors, success: false });
					}
				});
			}
		});
	},
	userRegistration: function(req, res) {
		let valid = true;
		let statusCode = 200;
		const validationErrors = [];

		for(let field of ["username", "email", "password"]) {
			if(!req.body[field]){
				valid = false;
				validationErrors.push(`${field} is required.`)
			}
		}
		if(req.body.password !== req.body.confirmPassword){
			valid = false;
			validationErrors.push("Password and confirm password don't match.");
		}

		if(!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(req.body.email)) {
			valid = false;
			validationErrors.push("Invalid email.");
		}

		if(!/^[a-zA-Z0-9_.]+$/.test(req.body.username)) {
			valid = false;
			validationErrors.push("Invalid username. Only letters, numbers, underscore, and period are allowed.");
		}

		if(valid){
			bcrypt.hash(req.body.password, 10, function(err, hash) {
				req.body.password = hash;
				models.registration(Object.assign({sessionID: req.sessionID}, req.body, newUserDefaults), function(err, rows, fields) {
					if(err) {
						if(err.code === "ER_DUP_ENTRY") {
							validationErrors.push("User Name and/or Email is already taken.");
							statusCode = 401;
						} else {
							validationErrors.push("There was a problem with registration. Please try again in a few minutes.");
							statusCode = 500;
						}
						console.log(err);
					} else {
						req.session.data = {id: rows.insertId};
						console.log("rows from register model", rows);
					}

					res.status(statusCode).json({errors: validationErrors, data: rows});
				});
			});
		} else {
			statusCode = 401;
			res.status(statusCode).json({errors: validationErrors, data: undefined});
		}
	},
}
