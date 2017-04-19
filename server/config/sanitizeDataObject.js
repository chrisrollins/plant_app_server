const connection = require('../config/mysql.js');
module.exports = function(data){
	const result = {};
	for(let key in data){
		if(key !== "sessionID")
			result[key] = connection.escape(data[key]);
		else
			result[key] = data[key];
	}
	return result;
}