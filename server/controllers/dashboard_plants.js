const path = require("path");
const htmlPath = path.join(__dirname, "./../../client/");
const requireFolder = require("./../config/req_folder.js");
const models = require(path.join(__dirname, "./../config/model_combiner.js"));

function shuffle(arr) {
	let curr = arr.length;
	let temp, rand;
	const newArr = [...arr];

	while (curr != 0) {
		rand = Math.floor(Math.random() * curr);
		curr--;

		temp = newArr[curr];
		newArr[curr] = newArr[rand];
		newArr[rand] = temp;
	}

	return newArr;
}

module.exports = {
	dashboard_plants: function(req, res){
		console.log(models);
		models.dashboard_plants(function(err, rows, fields){
			if(!err) {
				const randomPlants = shuffle(rows).slice(0, 5);
				res.json(randomPlants);
			} else {
				console.log(err);
				res.status(500).json(["Error getting plants for dashboard."]);
			}
		});
	}
}