//user model

//require these two things to be able to do queries
var connection = require('../config/mysql.js');
var doQuery = require('../config/doquery_function.js');
//the doQuery function is available. it takes a string which is the query, and an optional callback function
//the callback function takes one argument, rows. it is an array returned from a successful query.
//the callback function is called whether the query is successful or not.
//send the response (for example res.json(rows) or whatever) from the callback.

module.exports = {
	userLogin: function(req, res, callback){
		console.log("model function called successfully");

		//you can make a query by calling your callback, which you write in the controller.
		doQuery("select * from users", callback);
	},
	registration: function(req, res, callback){	
		const query = `INSERT INTO user (sessionID, username, email, password, created_at, updated_at) VALUES ("${req.sessionID}", "${req.body.username}", "${req.body.email}", "${req.body.password}", NOW(), NOW())`;
		console.log(query);
		doQuery(query, callback);
	}
}

