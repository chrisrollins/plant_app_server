//user model

const connection = require('../config/mysql.js');
const doQuery = require('../config/doquery_function.js');
const bcrypt = require('bcryptjs');
const sanitizeDataObject = require('../config/sanitizeDataObject.js');


const sessions = {};
/*
-format-
sessionID: {
	ipAddresses: {
		xxx.xxx.xxx.xxx: true
	},
	userID: n
}
*/

module.exports = {
	userLogin: function(data, callback) {
		console.log("model function called successfully");
		data = sanitizeDataObject(data);
		doQuery(`SELECT * FROM user WHERE email = "${data.email.toLowerCase()}"`, callback);
	},
	updateUserSessionRecord: function(data, callback) {
		const query = `UPDATE user SET sessionID = ${data.sessionID}, WHERE id=${data.id};`;
		doQuery(query);
	},
	registration: function(data, callback) {	
		data = sanitizeDataObject(data);
		const query = `INSERT INTO user (sessionID, username, money, permission_level, email, password, created_at, updated_at) VALUES ("${data.sessionID}", "${data.username}", "${data.money}", "${data.permission_level}", "${data.email.toLowerCase()}", "${data.password}", NOW(), NOW())`;
		console.log(query);
		doQuery(query, callback);
	},
	saveUserSession: function(data, callback) {
		const query = `UPDATE user SET sessionID = "${data.sessionID}" WHERE user.id = ${data.id};`;
		doQuery(query, function(err, rows, fields){
			sessions[data.sessionID] = { userID: rows[0] };
			callback(err, rows, fields);
		});
	},
	getUserIDbySession: function(data, callback) {
		if(sessions[data.sessionID])
		{
			callback(undefined, [sessions[data.sessionID].userID]);
		} else {
			const query = `SELECT user.id FROM user WHERE user.sessionID = "${data.sessionID}"`;
			doQuery(query, function(err, rows, fields){
				sessions[data.sessionID] = { userID: rows[0] };
				callback(err, rows, fields);
			});
		}
	}
}

	