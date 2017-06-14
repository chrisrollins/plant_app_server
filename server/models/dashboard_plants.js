const doQuery = require('../config/doquery_function.js');

module.exports = {
	dashboard_plants: function(callback){
		doQuery("SELECT COUNT(*) FROM plant", function(err, rows){
			console.log(rows[0]["COUNT(*)"]);

			doQuery("SELECT * FROM plant ORDER BY RAND() LIMIT 10", callback);
		});
		
	}
}