//Market model

const connection = require('../config/mysql.js');
const doQuery = require('../config/doquery_function.js');
const sanitizeDataObject = require('../config/sanitizeDataObject.js');

module.exports = {
	buyPlant: function(req, callback){
		console.log("buyPlant function called successfully");
	}
}