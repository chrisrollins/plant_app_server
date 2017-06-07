//Weather controller

const path = require("path");
const htmlPath = path.join(__dirname, "./../../client/");
const requireFolder = require("./../config/req_folder.js");
const models = require(path.join(__dirname, "./../config/model_combiner.js"));
const http = require("http");

module.exports = {
	getWeather(req, res){
		const i = req.url.indexOf('?');
		const rawQuery = req.url.substr(i+1);
		console.log(rawQuery);
		let query = "";
		for(const ch of rawQuery) {
			if(ch === " ") {
				query += "%20";
			} else {
				query += ch;
			}
		}
		try{
			http.request({
				host: 'api.openweathermap.org',
	  			path: `/data/2.5/weather?${query}&apikey=b3dcf9d4c1e4feb808adcfb355846b1c`
				
			}, function(response){
				let str = "";
				response.on('data', function (chunk) {
					str += chunk;
				});
				response.on('end', function () {
					console.log(str);
					res.json(str);
				});
			}).end();
		}catch(e){
			console.log(e);
		}
	}
}
