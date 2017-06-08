//Controller template

//the following things enable this controller to access the models, and also to send html files as responses
var path = require("path");
var htmlPath = path.join(__dirname, "./../../client/");
var requireFolder = require("./../config/req_folder.js");
var models = require(path.join(__dirname, "./../config/model_combiner.js"));

//when you call a model function it should return a value (usually an array, the result of a query)
//after that you can make the response here in the controller

module.exports = {
  profile: function(req, res){
    models.profile(req.sessionID, function(err, rows, fields) {
    // console.log("models profile", req.sessionID);
    // console.log("models profile res", res);
    res.json(rows)
    })
  }
}
