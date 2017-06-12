const doQuery = require('../config/doquery_function.js');

module.exports = {
	dashboad_plants: function(callback){
		doQuery("SELECT COUNT(*) FROM plants", function(err, count){
			console.log(count);

			if(count < 100) //this checks if the DB is big enough to start only pulling some of it.
			{
				doQuery("SELECT * FROM plants", callback);
			} else {
				doQuery("SELECT * FROM plants WHERE (ABS(CAST((BINARY_CHECKSUM(*) * RAND()) as int)) % 100) < 10 LIMIT 100", callback);
			}
		})
		
	}
}