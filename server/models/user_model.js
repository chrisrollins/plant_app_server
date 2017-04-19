//user model

//require these two things to be able to do queries
const connection = require('../config/mysql.js');
const doQuery = require('../config/doquery_function.js');
const bcrypt = require('bcryptjs');
const sanitizeDataObject = require('../config/sanitizeDataObject.js');
//the doQuery function is available. it takes a string which is the query, and an optional callback function
//the callback function takes one argument, rows. it is an array returned from a successful query.
//the callback function is called whether the query is successful or not.
//send the response (for example res.json(rows) or whatever) from the callback.

module.exports = {
	userLogin: function(data, callback){
		console.log("model function called successfully");
		data = sanitizeDataObject(data);
		doQuery(`SELECT * FROM user WHERE email = "${data.email}"" AND password = "${data.password}"`, callback);
	},
	registration: function(data, callback){	
		data = sanitizeDataObject(data);
		const query = `INSERT INTO user (sessionID, username, email, password, created_at, updated_at) VALUES ("${data.sessionID}", "${data.username}", "${data.email}", "${data.password}", NOW(), NOW())`;
		console.log(query);
		doQuery(query, callback);
	}
}

