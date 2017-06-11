const connection = require('../config/mysql.js');
const doQuery = require('../config/doquery_function.js');

var allPlantIDs = [];

doQuery(`SELECT plant.id FROM plant`, function(err, rows){
  allPlantIDs = rows;
  console.log("all plant id from model", allPlantIDs);
})

module.exports = allPlantIDs;
