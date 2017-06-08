//template for a model file

//require these two things to be able to do queries
const connection = require('../config/mysql.js');
const doQuery = require('../config/doquery_function.js');
const sanitizeDataObject = require('../config/sanitizeDataObject.js');
//the doQuery function is available. it takes a string which is the query, and an optional callback function
//the callback function takes one argument, rows. it is an array returned from a successful query.
//the callback function is called whether the query is successful or not.
//send the response (for example res.json(rows) or whatever) from the callback.

module.exports = {
  profile: function(sessionID, callback){
  profileQ = (`SELECT * FROM  user WHERE sessionID = "${sessionID}"`);
  console.log(profileQ);
  doQuery(profileQ, callback);
  }
}
