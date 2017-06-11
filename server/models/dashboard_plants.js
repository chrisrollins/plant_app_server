const path = require("path");
const htmlPath = path.join(__dirname, "./../../client/");
const requireFolder = require(path.join(__dirname, "./../config/req_folder.js"));
const models = require(path.join(__dirname, "./../config/model_combiner.js"));
const allPlantIDs = require(path.join(__dirname, "./../config/dash_board.js"));

console.log("all plants id from model", allPlantIDs);
