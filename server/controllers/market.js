//Market Controller

var path = require("path");
var htmlPath = path.join(__dirname, "./../../client/");
var requireFolder = require("./../config/req_folder.js");
var models = require(path.join(__dirname, "./../config/model_combiner.js"));

module.exports = {
	buyPlant: function(req, res){
		models.buyPlant({id: req.session.data.id}, function(err, rows, fields){
			res.status((err)?500:200).json(err, rows);
		});
	}
}