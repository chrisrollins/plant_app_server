//Market Controller


var path = require("path");
var htmlPath = path.join(__dirname, "./../../client/");
var requireFolder = require("./../config/req_folder.js");
var models = require(path.join(__dirname, "./../config/model_combiner.js"));
var plants = require(path.join(__dirname, "./../config/plant_data.js"));

module.exports = {
	buyPlant: function(req, res){

		models.buyPlant(Object.assign({id: req.session.data.id, plant_number: req.body.plant_number}, plants.plants[req.body.plant_number]), function(err, rows, fields){
			console.log(err, "err from buyPlant control");
			console.log(rows, "rows from buyPlant control");
			res.status((err)?500:200).json({errors: err, data: rows});
		});
	}
}
