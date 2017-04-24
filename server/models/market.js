//Market model

const connection = require('../config/mysql.js');
const doQuery = require('../config/doquery_function.js');
const sanitizeDataObject = require('../config/sanitizeDataObject.js');

module.exports = {
	buyPlant: function(data, callback){
		console.log(data, "buyPlant function called successfully");
		const query1 = `SELECT user.money FROM user WHERE user.id = ${data.id}`;

		console.log(query1, "query1 model buyPlant");

		doQuery(query1, function(err, rows, fields){
			console.log(rows, "!!!");
		const query2 = `UPDATE user SET user.money = ${rows[0].money - data.price} WHERE user.id = ${data.id}`;
		console.log(query2, "query2 model buyPlant");
			if (rows[0].money < data.price) {
				callback({error : "You do not have enough money."});
			} else {
				doQuery(query2, function(){
					const query3 = `INSERT INTO plant (user_id, name, description, stage, guide, age_days, seeds, created_at, updated_at) VALUES (${data.id}, "${data.name}", "${data.description}", 0, 0, 0, 0, NOW(), NOW())`;
					doQuery(query3, callback);
				});
			}
		})
	}
}
