const fs = require("fs");
const path = require("path");
const controllerPath = path.join(__dirname, "./../controllers");
const controllers = require(path.join(__dirname, "./../config/controller_combiner.js"));
const session = require("express-session");

console.log("controllers:", controllers);

routeFunctions = {
  get:{
    '/' : controllers.index,
    '/home' : controllers.home,
    '/elliot' : controllers.elliotsucks,
    '/retrieve_plants' : controllers.retrievePlants,
    '/get_random_plant' : controllers.getRandomPlant,
    '/session' : controllers.getSession,
    '/weather' : controllers.getWeather,
    '/protected/profile' : controllers.profile,
    '/dashboard_plants' : controllers.dashboard_plants
  },
  post:{
    '/register' : controllers.userRegistration,
    '/login' : controllers.userLogin,
    '/protected/buy_plant' : controllers.buyPlant
  }
};

function doForEveryRoute(req, res, callback)
{
  console.log("-----------------------------");
  console.log(`Route: ${req.path}`);
  console.log(`Session ID: ${req.sessionID}`);
  console.log("-----------------------------");
  console.log(callback);
  try{
    if(callback){
      callback(req, res);
    }
    else{
      console.log("Route doesn't exist.");
    }
  }catch(e){
    console.log(e);
  }
}

module.exports = function(app){

  app.get('*.*', function(req, res){
    console.log(`file requested: ${req.path}`);
    res.sendFile(req.path);
  });

  app.get('*', function(req, res){
    //stuff for only get
    doForEveryRoute(req, res, routeFunctions.get[req.path]);
  });

  app.post('*', function(req, res){
    //stuff for only post
    doForEveryRoute(req, res, routeFunctions.post[req.path]);
  });
}
