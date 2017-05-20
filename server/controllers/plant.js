//Controller template

//the following things enable this controller to access the models, and also to send html files as responses
const path = require("path");
const htmlPath = path.join(__dirname, "./../../client/");
const requireFolder = require(path.join(__dirname, "./../config/req_folder.js"));
const models = require(path.join(__dirname, "./../config/model_combiner.js"));
const plantDefs = require(path.join(__dirname, "./../config/plant_definitions.js"));

const plantArr = [];

for(let key in plantDefs){
	plantArr.push(plantDefs[key]);
}

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
	},
	getRandomPlant(req, res){
		const index = ~~(Math.random() * (plantArr.length));
		const plant = plantArr[index];
		res.json(plant);
	}
}
