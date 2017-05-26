module.exports = {
	elliotsucks: function(req, res) {
		let status = 200;
		const data = {elliot: ["Bulbasaur", "Charmander", "Squirtle", "Pidgey", "Rattata"][ ~~(Math.random() * 5) ]};
		const coinflip = Math.random();
		if(coinflip < 0.5){
			status = 500;
			data.elliot = undefined;
			data.error = "could not find any pokemon."
		}

		setTimeout(function(){
			res.status(status).json(data);
		}, Math.random() * 2000 + 4000);
	},
	getSession: function(req, res) {
		console.log(req.session);
		res.json({ sessionObj: req.session, sessionID: req.sessionID });
	}
}