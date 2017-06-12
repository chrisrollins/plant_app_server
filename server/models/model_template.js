//template for a model file

const doQuery = require('../config/doquery_function.js');
const sanitizeDataObject = require('../config/sanitizeDataObject.js');
//the doQuery function is available. it takes a string which is the query, and an optional callback function
//the callback function takes one argument, rows. it is an array returned from a successful query.
//the callback function is called whether the query is successful or not.
//send the response (for example res.json(rows) or whatever) from the callback.

module.exports = {
	test: function(req, callback){
		console.log("model function called successfully");
	}
}

