//modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const session = require("express-session");
const crypto = require("crypto");
const app = express();
const port = 5000;
const keys = require(path.join(__dirname, "./server/config/api_keys.js"));

console.log("api keys:", keys);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '/client')));
app.set('views', path.join(__dirname, './server'));
app.set('view engine', 'ejs');

app.use('', function(req, res, next){
	;
	for(let key in req.connection)
	{
		console.log(key);
	}
    console.log(`incoming connection.\nclient ip: ${req.ip}`);
    next();
})

app.use(session({
  secret: crypto.randomBytes(48).toString("hex"),
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true}
}));

app.use('/protected', function(req, res, next) {
	if(req.session.data){
		next();
	} else {
		res.status(401).json({errors: ["Please log in."]});
	}
})

require('./server/config/db.js');
require('./server/config/routes.js')(app);

const server = app.listen(port, function() {
	console.log("listening on port", port);
});
