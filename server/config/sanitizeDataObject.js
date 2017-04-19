const connection = require('../config/mysql.js');
module.exports = function(data){
	const result = {};
	for(let key in data){
		if(key === "sessionID" || key ==="password"){
			result[key] = data[key];
		}
		else
			result[key] = connection.escape(data[key]);
	}
	return result;
}