const connection = require('../config/mysql.js');
const sanitize = require('../config/sanitizeQuery.js');

module.exports = function doQuery(query, callback)
{
    const sanitizeResult = sanitize(query);
    if(sanitizeResult.warnings.length > 0)
        console.log("Possible SQL injection attempt. Illegal characters removed from query:", sanitizeResult.warnings);
    try
    {
        connection.query(sanitizeResult.query, function(err, rows, fields){
            callback(err, rows, fields);
        });
    }
    catch (e)
    {
        callback(e, rows, fields);
        console.log(e);
        console.log("---");
        console.log(sanitized);
    }
}
