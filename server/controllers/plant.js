//Controller template

//the following things enable this controller to access the models, and also to send html files as responses
var path = require("path");
var htmlPath = path.join(__dirname, "./../../client/");
var requireFolder = require("./../config/req_folder.js");
var models = require(path.join(__dirname, "./../config/model_combiner.js"));

//when you call a model function it should return a value (usually an array, the result of a query)
//after that you can make the response here in the controller

module.exports = {
	retrievePlants: function(req, res){
		if(req.session.data)
		{
			console.log(req.session.data);
			models.retrievePlants(Object.assign({}, req.body, req.session.data), function(err, rows, fields){
				res.json({errors: err, data: rows});
			});
		}
		else{
			res.status(401).json({errors: ["Not logged in."], data: undefined});
		}
	}
}
