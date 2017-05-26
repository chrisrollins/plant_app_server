const requireFolder = require("./../config/req_folder.js");
const models = requireFolder("models");
const exps = {};

for(const key in models){
	for(const alreadyHas in models[key]){
		if(exps.hasOwnProperty(alreadyHas)){
			console.log("WARNING: Name collision in model functions. Function:", alreadyHas);
			console.log("file:", key);
		}
	}
	Object.assign(exps, models[key]);
}

module.exports = exps;