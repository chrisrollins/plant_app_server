const effectDefaults = Object.freeze({
	"sun": {health: 1},
	"rain": {health: 1},
	"water": {health: 1},
});
class Plant {
	constructor(name, description, price, img_url, health, idealTemp, idealHumidity){
		
		//this enables you to pass an object with keys matching the parameters instead of passing the parameters directly.
		if(typeof name === "object")
		{
			Object.assign(this, name);
		}
		else
		{
			this.name = name;
			this.description = description;
			this.price = price;
			this.img_url = img_url;
			this.health = health;
			this.idealTemp = idealTemp;
			this.idealHumidity = idealHumidity;
		}

		this.stage = 0;
		this.effects = Object.assign({}, effectDefaults); //copy the default effects object
		this.dailyRequirements = [];
	}

	toJSONString(){
		return JSON.stringify(this);
	};

	registerEffect(effectName, statChanges){
		this.effects[effectName] = Object.assign({}, statChanges);
		return this;
	}

	registerDailyRequirement(reqName)
	{
		this.dailyRequirements.push(reqName);
		return this;
	}
}

const plantDefinitions = {
	Zucchini: new Plant({
	name: "Zucchini",
	description: "Green and long",
	price: 10,
	img_url: "https://s3-us-west-1.amazonaws.com/fluffy-system-plant-app/plant-images/zucchini.jpg",
	health: 100,
	idealTemp: 60,
	idealHumidity: 50})
	.registerEffect("sun", {health: 1})
	.registerDailyRequirement("sun")
}

module.exports = plantDefinitions;


