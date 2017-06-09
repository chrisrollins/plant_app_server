const effectDefaults = Object.freeze({
	"sun": {health: 1},
	"water": {health: 1}, //rain should count as water
});
class PlantDefinition {
	constructor(name, description, guide, price, img_url, health, idealTemp, idealHumidity){
		
		//this enables you to pass an object with keys matching the parameters instead of passing the parameters directly.
		if(typeof name === "object")
		{
			Object.assign(this, name);
		}
		else
		{
			this.name = name;
			this.description = description;
			this.guide = guide;
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

const plantDefinitions = {};
const addPlantDef = function(plant){
	plantDefinitions[plant.name] = plant;
}

addPlantDef(new PlantDefinition({
name: "Zucchini",
description: "Green and long.",
guide: "",
price: 10,
img_url: "https://s3-us-west-1.amazonaws.com/fluffy-system-plant-app/plant-images/zucchini.jpg",
health: 100,
idealTemp: 60,
idealHumidity: 50})
.registerEffect("sun", {health: 1})
.registerDailyRequirement("sun"));

addPlantDef(new PlantDefinition({
name: "Watermelon",
description: "Green with red inside.",
price: 1,
img_url: "https://s3-us-west-1.amazonaws.com/fluffy-system-plant-app/plant-images/watermelon.jpg",
health: 100,
idealTemp: 70,
idealHumidity: 50})
.registerEffect("sun", {health: 1})
.registerEffect("water", {health: 1})
.registerDailyRequirement("sun")
.registerDailyRequirement("water"));

addPlantDef(new PlantDefinition({
name: "Eggplant",
description: "Purple.",
price: 2,
img_url: "https://s3-us-west-1.amazonaws.com/fluffy-system-plant-app/plant-images/watermelon.jpg",
health: 100,
idealTemp: 70,
idealHumidity: 50})
.registerEffect("sun", {health: 1})
.registerEffect("water", {health: 1})
.registerDailyRequirement("sun")
.registerDailyRequirement("water"));

addPlantDef(new PlantDefinition({
name: "Venus Flytrap",
description: "It eats flies.",
price: 5,
img_url: "https://s3-us-west-1.amazonaws.com/fluffy-system-plant-app/plant-images/watermelon.jpg",
health: 100,
idealTemp: 65,
idealHumidity: 70})
.registerEffect("bugs", {health: 1})
.registerDailyRequirement("bugs")
.registerDailyRequirement("sun"));


module.exports = plantDefinitions;



